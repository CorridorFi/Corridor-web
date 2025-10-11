"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 id="hero-heading" className="text-pretty text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {"Future of On-Chain Payroll."}
          </h1>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            {
              "Instant payroll, easy team payments, and auto-investing — built for the new economy on Solana."
            }
          </p>
          <div className="mt-8 flex justify-center">
            <button className="group relative px-6 py-2.5 text-sm font-semibold border-2 border-foreground rounded-full transition-all duration-300 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              <span className="flex items-center gap-2 text-foreground group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:via-teal-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {"Launching Soon"}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:stroke-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
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
