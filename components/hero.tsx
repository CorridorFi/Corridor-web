"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 id="hero-heading" className="text-pretty text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {"Payroll Made Simple. Payments Made Easy."}
          </h1>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            {
              "Instant payroll, easy team payments, and auto-investing — built for the new economy on Solana."
            }
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard">
              <button className="group relative px-6 py-2.5 text-sm font-semibold text-slate-900 bg-white border-2 border-slate-900 rounded-full overflow-hidden transition-all duration-300 hover:text-white hover:-translate-y-1 active:translate-y-0 shadow-[0_0_0_0_rgba(20,184,166,0)] hover:shadow-[0_12px_24px_-4px_rgba(20,184,166,0.4)]">
                {/* Animated background on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out"></span>
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  {"Launching Soon"}
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
        {/* Visual mockup area */}
        <div className="relative mx-auto mt-12 w-full max-w-5xl">
          {/* Main landing image with dissolving border */}
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden">
            {/* Border dissolving effect only */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-background/20 via-transparent to-background/20 z-10 pointer-events-none"></div>
            <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-transparent via-transparent to-background/10 z-10 pointer-events-none"></div>
            
            <Image
              src="/landing-image.png"
              alt="Corridor platform visualization showing global payment flows"
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            
            {/* Subtle bottom blending effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background/60 via-background/20 to-transparent z-20 pointer-events-none rounded-b-xl"></div>
          </div>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            viewBox="0 0 1200 500"
            fill="none"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 50 420 C 300 300, 600 380, 850 260 S 1150 120, 1150 120"
              stroke="currentColor"
              className="text-primary/40"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
