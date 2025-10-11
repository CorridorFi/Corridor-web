"use client"

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
      </div>
    </section>
  )
}
