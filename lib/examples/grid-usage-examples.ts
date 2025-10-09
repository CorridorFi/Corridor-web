/**
 * Grid SDK Usage Examples
 * 
 * This file contains practical examples of how to use the Grid service
 * in your Next.js application.
 */

import { gridService, GridError } from '@/lib/grid-client';
import {
  formatAccountNumber,
  formatCurrency,
  validateTransactionAmount,
  validateSufficientBalance,
  calculateTransactionFee,
} from '@/lib/grid-utils';

// ============================================================================
// EXAMPLE 1: Create a New Account
// ============================================================================

export async function createUserAccount(userId: string) {
  try {
    const result = await gridService.createAccount({
      userId,
      accountType: 'checking',
      currency: 'USD',
      metadata: {
        initialDeposit: 100,
        source: 'web_signup',
      },
    });

    console.log('Account created:', result);
    return result;
  } catch (error) {
    if (error instanceof GridError) {
      console.error('Failed to create account:', error.message);
      throw error;
    }
    throw new Error('Unexpected error during account creation');
  }
}

// ============================================================================
// EXAMPLE 2: Fetch and Display User Accounts
// ============================================================================

export async function getUserAccountsWithFormatting(userId: string) {
  try {
    const result = await gridService.listAccounts(userId, {
      page: 1,
      limit: 10,
      status: 'active',
    });

    // Format accounts for display
    const formattedAccounts = result.accounts?.map((account: any) => ({
      ...account,
      displayAccountNumber: formatAccountNumber(account.accountNumber),
      displayBalance: formatCurrency(account.balance, account.currency),
    }));

    return {
      ...result,
      accounts: formattedAccounts,
    };
  } catch (error) {
    if (error instanceof GridError) {
      console.error('Failed to fetch accounts:', error.message);
    }
    throw error;
  }
}

// ============================================================================
// EXAMPLE 3: Send and Verify OTP
// ============================================================================

export async function sendOtpToUser(
  userId: string,
  email: string
): Promise<string> {
  try {
    const result = await gridService.sendOtp({
      userId,
      method: 'email',
      recipient: email,
    });

    console.log(`OTP sent to ${email}, expires in ${result.expiresIn}s`);
    return result.sessionId;
  } catch (error) {
    if (error instanceof GridError) {
      console.error('Failed to send OTP:', error.message);
    }
    throw error;
  }
}

export async function verifyUserOtp(
  otp: string,
  sessionId: string,
  userId: string
) {
  try {
    const result = await gridService.verifyOtp({
      otp,
      sessionId,
      userId,
    });

    if (result.verified) {
      console.log('OTP verified successfully');
      return {
        success: true,
        sessionToken: result.sessionToken,
      };
    } else {
      return {
        success: false,
        error: 'Invalid OTP code',
      };
    }
  } catch (error) {
    if (error instanceof GridError) {
      console.error('OTP verification failed:', error.message);
    }
    throw error;
  }
}

// ============================================================================
// EXAMPLE 4: Execute Transaction with Validation
// ============================================================================

export async function transferFunds(
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  currency: string = 'USD'
) {
  try {
    // Validate transaction amount
    validateTransactionAmount(amount, 0.01, 10000);

    // Get source account to check balance
    const sourceAccount = await gridService.getAccount(fromAccountId);
    
    // Calculate fee
    const fee = calculateTransactionFee(amount);
    
    // Validate sufficient balance
    validateSufficientBalance(sourceAccount.balance || 0, amount, fee);

    // Execute transaction
    const result = await gridService.executeTransaction({
      fromAccountId,
      toAccountId,
      amount,
      currency,
      description: 'Transfer between accounts',
      metadata: {
        fee,
        totalAmount: amount + fee,
      },
    });

    console.log('Transaction executed:', result);
    return result;
  } catch (error) {
    if (error instanceof GridError) {
      console.error('Transaction failed:', error.message);
      
      // Handle specific error codes
      switch (error.code) {
        case 'INSUFFICIENT_BALANCE':
          throw new Error('You do not have enough funds for this transaction');
        case 'AMOUNT_TOO_HIGH':
          throw new Error('Transaction amount exceeds the maximum limit');
        case 'AMOUNT_TOO_LOW':
          throw new Error('Transaction amount is below the minimum limit');
        default:
          throw new Error('Transaction failed. Please try again later.');
      }
    }
    throw error;
  }
}

// ============================================================================
// EXAMPLE 5: Get Account Details with Error Handling
// ============================================================================

export async function getAccountDetails(accountId: string) {
  try {
    const account = await gridService.getAccount(accountId);

    // Format for display
    return {
      id: account.accountId,
      displayAccountNumber: formatAccountNumber(account.accountId),
      balance: account.balance,
      displayBalance: formatCurrency(account.balance || 0, 'USD'),
      status: account.status,
    };
  } catch (error) {
    if (error instanceof GridError) {
      if (error.statusCode === 404) {
        throw new Error('Account not found');
      }
      console.error('Failed to fetch account:', error.message);
    }
    throw error;
  }
}

// ============================================================================
// EXAMPLE 6: Paginated Account Listing
// ============================================================================

export async function getAccountsPaginated(
  userId: string,
  page: number = 1,
  limit: number = 10
) {
  try {
    const result = await gridService.listAccounts(userId, {
      page,
      limit,
      status: 'active',
    });

    return {
      accounts: result.accounts || [],
      pagination: result.pagination,
      hasMore: result.pagination && page < result.pagination.totalPages,
    };
  } catch (error) {
    if (error instanceof GridError) {
      console.error('Failed to fetch accounts:', error.message);
    }
    throw error;
  }
}

// ============================================================================
// EXAMPLE 7: Complete OTP Flow (Send + Verify)
// ============================================================================

export async function completeOtpVerification(
  userId: string,
  email: string,
  otpCode: string
) {
  try {
    // Step 1: Send OTP
    console.log('Sending OTP...');
    const sessionId = await sendOtpToUser(userId, email);

    // In a real app, the user would receive the OTP and enter it
    // This is just for demonstration
    console.log('Waiting for user to enter OTP...');

    // Step 2: Verify OTP
    console.log('Verifying OTP...');
    const verificationResult = await verifyUserOtp(otpCode, sessionId, userId);

    if (verificationResult.success) {
      console.log('User authenticated successfully');
      return {
        success: true,
        sessionToken: verificationResult.sessionToken,
      };
    } else {
      return {
        success: false,
        error: 'Invalid OTP code',
      };
    }
  } catch (error) {
    console.error('OTP flow failed:', error);
    throw error;
  }
}

// ============================================================================
// EXAMPLE 8: Batch Account Creation
// ============================================================================

export async function createMultipleAccounts(
  userId: string,
  accountTypes: string[]
) {
  const results = [];
  const errors = [];

  for (const accountType of accountTypes) {
    try {
      const result = await gridService.createAccount({
        userId,
        accountType,
        currency: 'USD',
        metadata: {
          batchCreation: true,
        },
      });
      results.push(result);
    } catch (error) {
      errors.push({
        accountType,
        error: error instanceof GridError ? error.message : 'Unknown error',
      });
    }
  }

  return {
    successful: results,
    failed: errors,
    summary: {
      total: accountTypes.length,
      success: results.length,
      failed: errors.length,
    },
  };
}

// ============================================================================
// EXAMPLE 9: Transaction History
// ============================================================================

export async function getTransactionHistory(accountId: string) {
  try {
    // Get account details which includes recent transactions
    const account = await gridService.getAccount(accountId);

    // In a real implementation, you would have a dedicated method
    // for fetching transaction history with pagination
    
    return {
      accountId: account.accountId,
      transactions: [], // Would be populated from actual Grid SDK
    };
  } catch (error) {
    if (error instanceof GridError) {
      console.error('Failed to fetch transaction history:', error.message);
    }
    throw error;
  }
}

// ============================================================================
// EXAMPLE 10: Error Recovery Pattern
// ============================================================================

export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (error instanceof GridError) {
        // Don't retry client errors (4xx)
        if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
          throw error;
        }
      }

      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Retry attempt ${attempt}/${maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

// Usage example:
export async function createAccountWithRetry(userId: string) {
  return executeWithRetry(() =>
    gridService.createAccount({
      userId,
      accountType: 'checking',
      currency: 'USD',
    })
  );
}
