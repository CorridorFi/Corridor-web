export function SocialProof() {
  return (
    <section className="border-y border-border bg-muted/30" aria-labelledby="trusted-heading">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="text-center">
          <p id="trusted-heading" className="text-xs font-medium tracking-widest text-muted-foreground">
            {"TRUSTED BY LEADING GLOBAL TEAMS"}
          </p>
          <div className="mt-4 grid grid-cols-3 items-center justify-items-center gap-6 md:gap-10">
            <img src="/brex-logo-greyscale.jpg" alt="Brex" className="h-6 w-24 opacity-70" />
            <img src="/deel-logo-greyscale.jpg" alt="Deel" className="h-6 w-24 opacity-70" />
            <img src="/rippling-logo-greyscale.jpg" alt="Rippling" className="h-6 w-24 opacity-70" />
          </div>
        </div>
      </div>
    </section>
  )
}
