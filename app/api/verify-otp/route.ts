import { NextRequest, NextResponse } from 'next/server';
import { gridClient } from '@/lib/grid-client';

// POST /api/verify-otp - Verify OTP code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { otp, user } = body;

    if (!otp || !user) {
      return NextResponse.json(
        { success: false, error: 'OTP code and user are required' },
        { status: 400 }
      );
    }

    // Normalize and validate OTP (must be exactly 6 digits)
    const normalizedOtp = String(otp).trim();
    const isValidOtp = /^\d{6}$/.test(normalizedOtp);
    if (!isValidOtp) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP format' },
        { status: 400 }
      );
    }

    // Read session secrets from secure cookie
    const cookieValue = request.cookies.get('grid_session_secrets')?.value;
    if (!cookieValue) {
      return NextResponse.json(
        { success: false, error: 'Missing session secrets. Please restart authentication.' },
        { status: 400 }
      );
    }
    let sessionSecrets;
    try {
      sessionSecrets = JSON.parse(cookieValue);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid session secrets cookie.' },
        { status: 400 }
      );
    }

    let result: unknown
    try {
      result = await gridClient.completeAuthAndCreateAccount({
        otpCode: normalizedOtp,
        user,
        sessionSecrets,
      })
    } catch (sdkError) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP' },
        { status: 401 }
      );
    }

    try {
      const gridId = (result as any)?.id ?? (result as any)?.user?.id ?? (result as any)?.account?.id ?? (result as any)?.gridId
      if (gridId) console.log('Grid user/account verified with id:', gridId)
    } catch {}

    const response = NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
    });

    // Clear session secrets cookie after successful verification
    response.cookies.set({
      name: 'grid_session_secrets',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Error verifying OTP:', error);

    return NextResponse.json(
      { success: false, error: 'Invalid or expired OTP' },
      { status: 401 }
    );
  }
}
