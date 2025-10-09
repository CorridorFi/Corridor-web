/**
 * Type definitions for Grid SDK Service
 */

// Account Types
export interface GridAccount {
  id: string;
  accountNumber: string;
  userId: string;
  accountType: 'checking' | 'savings' | 'investment' | 'business';
  currency: string;
  balance: number;
  availableBalance: number;
  status: 'active' | 'inactive' | 'frozen' | 'closed';
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface CreateAccountParams {
  userId: string;
  accountType: string;
  currency: string;
  initialDeposit?: number;
  metadata?: Record<string, unknown>;
}

export interface ListAccountsOptions {
  page?: number;
  limit?: number;
  status?: string;
  accountType?: string;
}

// Transaction Types
export interface GridTransaction {
  id: string;
  fromAccountId: string;
  toAccountId?: string;
  amount: number;
  currency: string;
  type: 'debit' | 'credit' | 'transfer';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  createdAt: string;
  completedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface ExecuteTransactionParams {
  fromAccountId: string;
  toAccountId?: string;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

// OTP Types
export interface SendOtpParams {
  userId: string;
  method: 'email' | 'sms';
  recipient: string;
  action?: 'login' | 'verify_transaction' | 'password_reset' | 'account_recovery';
}

export interface VerifyOtpParams {
  otp: string;
  sessionId: string;
  userId?: string;
  action?: string;
}

export interface OtpSession {
  sessionId: string;
  expiresIn: number;
  expiresAt: string;
  method: 'email' | 'sms';
  recipient: string;
}

export interface OtpVerificationResult {
  success: boolean;
  verified: boolean;
  sessionToken?: string;
  verifiedAt?: string;
  error?: string;
}

// API Response Types
export interface GridApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User Types
export interface GridUser {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  status: 'active' | 'inactive' | 'suspended';
  kycStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Payment Method Types
export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'bank_account' | 'card' | 'crypto_wallet';
  status: 'active' | 'inactive' | 'expired';
  isDefault: boolean;
  details: {
    last4?: string;
    bankName?: string;
    walletAddress?: string;
    network?: string;
  };
  createdAt: string;
}

// Webhook Types
export interface GridWebhookEvent {
  id: string;
  type: 
    | 'account.created'
    | 'account.updated'
    | 'account.closed'
    | 'transaction.pending'
    | 'transaction.completed'
    | 'transaction.failed'
    | 'otp.sent'
    | 'otp.verified'
    | 'user.created'
    | 'user.updated';
  data: unknown;
  createdAt: string;
  processedAt?: string;
}

// Error Types
export interface GridErrorDetails {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
  timestamp?: string;
}

