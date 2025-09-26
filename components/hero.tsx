"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 id="hero-heading" className="text-pretty text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {"Global Payroll, Instant P2P. Unified on Solana."}
          </h1>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            {
              "Corridor is the single platform for businesses to run lightning-fast payroll and for individuals to send and receive money frictionlessly across the globe."
            }
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="neo" className="px-6">
              {"Request a Demo"}
            </Button>
            <Button size="lg" variant="neoOutline" className="px-6">
              {"See P2P App"}
            </Button>
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
