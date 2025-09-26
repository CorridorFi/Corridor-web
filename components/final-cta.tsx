"use client"

import { Button } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className="border-t border-border bg-muted/30" aria-labelledby="final-cta-heading">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-heading" className="text-pretty text-3xl font-semibold md:text-4xl">
            {"Ready to Transform Your Payments?"}
          </h2>
          <p className="mt-3 text-balance text-muted-foreground">
            {
              "Unify global payroll and peer-to-peer transfers on a single, secure platform—settle in seconds and stay in control."
            }
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="neo" className="px-6">
              {"Request a Demo"}
            </Button>
            <Button size="lg" variant="neoOutline" className="px-6">
              {"Create an Account"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
