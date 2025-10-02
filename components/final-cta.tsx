"use client"

import Link from "next/link"

export function FinalCta() {
  return (
    <section className="border-t border-border bg-muted/30" aria-labelledby="final-cta-heading">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-heading" className="text-pretty text-3xl font-semibold md:text-4xl">
            {"Ready to Transform Your Payments?"}
          </h2>
          <p className="mt-3 text-balance text-muted-foreground">
            {
              "Unify global payroll and peer-to-peer transfers on a single, secure platform—settle in seconds and stay in control."
            }
          </p>
          <div className="mt-8 flex justify-center">
              <button className="group relative px-6 py-2.5 text-sm font-semibold text-slate-900 bg-white border-2 border-slate-900 rounded-full overflow-hidden transition-all duration-300 hover:text-white hover:-translate-y-1 active:translate-y-0 shadow-[0_0_0_0_rgba(20,184,166,0)] hover:shadow-[0_12px_24px_-4px_rgba(20,184,166,0.4)]">
                {/* Animated background on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out"></span>
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  {"Get Started"}
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
          </div>
        </div>
      </div>
    </section>
  )
}
