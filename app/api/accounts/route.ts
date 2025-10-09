import { NextRequest, NextResponse } from 'next/server';
import { gridClient, GridError } from "@/lib/grid-client"

// GET /api/accounts - List all accounts or get current user accounts
export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Validate required parameters
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

// POST /api/accounts - Create a new account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await gridClient.createAccount({
      email
    })

    console.log(user);
    console.log('Grid pre-auth userId:', (user as any)?.id ?? (user as any)?.gridId);

    const sessionSecrets = await gridClient.generateSessionSecrets();
    console.log('Session secrets generated - these contain private keys needed for signing!');

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate OTP' },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      { success: true, message: 'OTP sent to email for verification', user },
      { status: 201 }
    );

    // Store session secrets securely in an HttpOnly cookie (5 min)
    response.cookies.set({
      name: 'grid_session_secrets',
      value: JSON.stringify(sessionSecrets),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 5,
    });

    return response;
  } catch (error) {
    console.error('Error creating account:', error);
    


    return NextResponse.json(
      { success: false, error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
