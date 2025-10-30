import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const waitlistSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = waitlistSchema.parse(body)

    // Check if email already exists
    const existing = await prisma.waitlist.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new waitlist entry
    const waitlistEntry = await prisma.waitlist.create({
      data: { email },
    })

    return NextResponse.json(
      { message: 'Successfully joined waitlist', id: waitlistEntry.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid email format', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
