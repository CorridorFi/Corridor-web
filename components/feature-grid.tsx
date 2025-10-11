"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ShieldCheck, TrendingUp, Network, Rows3 } from "lucide-react"

const features = [
  {
    title: "Atomic Bulk Payments",
    description: "Pay 1 or 1,000 people in a single, secure transaction for a fraction of a penny.",
    Icon: Rows3,
    imageSrc: "/process.png",
  },
  {
    title: "Non-Custodial Security",
    description:
      "You are always in control. Corridor is built on self-custody principles, giving you full ownership of your funds.",
    Icon: ShieldCheck,
    imageSrc: "/secure.png",
  },
  {
    title: "Fiat-to-Crypto Ramps",
    description: "Seamlessly move between USDC and local currencies with our integrated on/off-ramp partners.",
    Icon: Network,
    imageSrc: "/usdc.png",
  },
  {
    title: "Auto-Invest Savings",
    description: "Automatically invest a portion of every paycheck into high-yield DeFi protocols. You set the percentage, and Corridor handles the rest. Put your savings to work the moment you get paid.",
    Icon: TrendingUp,
    imageSrc: "/investment.png",
  },
]

export function FeatureGrid() {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-index"))
            setActiveIndex(idx)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    )
    stepRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section aria-labelledby="features-heading" className="relative h-screen">
      {/* Sticky Title at Top - Visible within section only */}
      <div className="sticky top-0 left-0 right-0 z-50 pt-8 pb-6 text-center pointer-events-none bg-background/80 backdrop-blur-sm">
        <h2 id="features-heading" className="text-3xl font-semibold md:text-4xl">
          {"Key Features"}
        </h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          {"What makes Corridor fast, secure, and user-friendly."}
        </p>
      </div>

      {/* Snap Container with Hidden Scrollbar */}
      <div className="snap-y snap-mandatory overflow-y-auto h-full scrollbar-hide absolute inset-0">
        {/* Desktop: Full-screen feature slides with snap scrolling */}
        <div className="hidden md:block">
          {features.map(({ title, description, imageSrc }, i) => {
            const isOdd = i % 2 === 0
            const isActive = activeIndex === i
            
            return (
              <div
                key={`feature-${i}`}
                ref={(el) => { stepRefs.current[i] = el }}
                data-step-index={i}
                className="snap-start h-screen w-full"
              >
                <div className="h-full max-w-7xl mx-auto grid grid-cols-2 gap-8 md:gap-12 items-center px-6 md:px-8 pt-32">
                  {/* Content positioned based on isOdd */}
                  {isOdd ? (
                    <>
                      {/* Text on left */}
                      <div className="flex items-center justify-end">
                        <div 
                          className="max-w-md transition-all duration-700 ease-out"
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            transform: isActive ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.96)'
                          }}
                        >
                          <h3 className="text-3xl md:text-4xl font-semibold mb-6">{title}</h3>
                          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Image on right */}
                      <div className="flex items-center justify-center">
                        <div 
                          className="relative w-full h-[70vh] transition-all duration-700 ease-out"
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            transform: isActive ? 'scale(1)' : 'scale(0.92)'
                          }}
                        >
                          <Image
                            src={imageSrc}
                            alt={`${title} illustration`}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="45vw"
                            priority={i === 0}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Image on left */}
                      <div className="flex items-center justify-center">
                        <div 
                          className="relative w-full h-[70vh] transition-all duration-700 ease-out"
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            transform: isActive ? 'scale(1)' : 'scale(0.92)'
                          }}
                        >
                          <Image
                            src={imageSrc}
                            alt={`${title} illustration`}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="45vw"
                          />
                        </div>
                      </div>
                      
                      {/* Text on right */}
                      <div className="flex items-center justify-start">
                        <div 
                          className="max-w-md transition-all duration-700 ease-out"
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            transform: isActive ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.96)'
                          }}
                        >
                          <h3 className="text-3xl md:text-4xl font-semibold mb-6">{title}</h3>
                          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile: Traditional stacked layout */}
        <div className="md:hidden">
          {features.map(({ title, description, imageSrc }, i) => (
            <div key={`mobile-${i}`} className="snap-start h-screen flex flex-col items-center justify-center px-6 py-12 pt-32">
              <div className="space-y-8 max-w-lg">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
                <div className="relative w-full h-80">
                  <Image
                    src={imageSrc}
                    alt={`${title} illustration`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
