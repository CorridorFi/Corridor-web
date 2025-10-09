"use client"

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { cn } from '@/lib/utils'

export default function AuthPage() {
  const router = useRouter()
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)

  async function startAuth(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok || !data?.success) throw new Error(data?.error || 'Failed to start auth')
      setUser(data.user)
      setStep('otp')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function verifyOtp(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    if (!otp || !user) return
    setLoading(true)
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, user }),
      })
      const data = await res.json()
      if (!res.ok || !data?.success) throw new Error(data?.error || 'Failed to verify OTP')
      router.push('/home')
    } catch (err: any) {
      setError(err.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-background to-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className={cn('overflow-hidden transition-shadow')}> 
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Image src="/corridor.png" alt="Corridor" width={28} height={28} className="rounded-sm" />
              <CardTitle className="text-xl">Sign in to Corridor</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              {step === 'email' ? 'Enter your email to receive a one-time code.' : `We sent a code to ${email}.`}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={step === 'email' ? startAuth : verifyOtp} className="space-y-4">
              {step === 'email' && (
                <div className={cn('transition-opacity duration-300', step === 'email' ? 'opacity-100' : 'opacity-0')}>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              )}

              {step === 'otp' && (
                <div className={cn('transition-all duration-300', step === 'otp' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1')}> 
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={loading}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}

              {error && (
                <p className="text-sm text-destructive" role="alert">{error}</p>
              )}

              <div className="flex gap-2">
                {step === 'otp' && (
                  <Button type="button" variant="ghost" className="ml-[-0.25rem]" onClick={() => setStep('email')} disabled={loading}>
                    Change email
                  </Button>
                )}
                <div className="ml-auto">
                  <button
                    type="submit"
                    disabled={loading || (step === 'otp' && otp.length !== 6)}
                    className="group relative px-4 py-2 text-sm font-semibold text-slate-900 bg-white border-2 border-slate-900 rounded-lg overflow-hidden transition-all duration-300 hover:text-white hover:-translate-y-1 active:translate-y-0 shadow-[0_0_0_0_rgba(20,184,166,0)] hover:shadow-[0_12px_24px_-4px_rgba(20,184,166,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? 'Please wait…' : step === 'email' ? 'Send code' : 'Verify'}
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Protected by passwordless authentication. We never store your password.
        </p>
      </div>
    </div>
  )
}


