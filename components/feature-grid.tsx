"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ShieldCheck, TrendingUp, Network, Rows3 } from "lucide-react"

const features = [
  {
    title: "Atomic Bulk Payments",
    description: "Pay 1 or 1,000 people in a single, secure transaction for a fraction of a penny.",
    Icon: Rows3,
    imageSrc: "/transfer.jpg",
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
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(new Set())
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  // Observe each feature for entrance animations
  useEffect(() => {
    const observers = featureRefs.current.map((el, idx) => {
      if (!el) return null
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleFeatures(prev => new Set(prev).add(idx))
            }
          })
        },
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
      )
      
      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach(obs => obs?.disconnect())
    }
  }, [])

  return (
    <section aria-labelledby="features-heading" className="py-16 md:py-24">
      {/* Section Title */}
      <div className="text-center mb-16 px-6">
        <h2 id="features-heading" className="text-3xl font-semibold md:text-5xl mb-4">
          Key Features
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          What makes Corridor fast, secure, and user-friendly.
        </p>
      </div>

      {/* Features List */}
      <div className="max-w-7xl mx-auto px-6 space-y-24 md:space-y-32">
        {features.map(({ title, description, imageSrc }, i) => {
          const isOdd = i % 2 === 0
          const isVisible = visibleFeatures.has(i)
          
          return (
            <div
              key={`feature-${i}`}
              ref={(el) => { featureRefs.current[i] = el }}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Desktop: Alternate layout, Mobile: Always image then text */}
              {isOdd ? (
                <>
                  {/* Text */}
                  <div 
                    className={`order-2 md:order-1 transition-all duration-1000 ease-out ${
                      isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-12'
                    }`}
                    style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
                  >
                    <h3 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6">
                      {title}
                    </h3>
                    <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                  
                  {/* Image */}
                  <div 
                    className={`order-1 md:order-2 transition-all duration-1000 ease-out ${
                      isVisible 
                        ? 'opacity-100 translate-x-0 scale-100' 
                        : 'opacity-0 translate-x-12 scale-95'
                    }`}
                  >
                    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={imageSrc}
                        alt={`${title} illustration`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Image */}
                  <div 
                    className={`order-1 transition-all duration-1000 ease-out ${
                      isVisible 
                        ? 'opacity-100 translate-x-0 scale-100' 
                        : 'opacity-0 -translate-x-12 scale-95'
                    }`}
                  >
                    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={imageSrc}
                        alt={`${title} illustration`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div 
                    className={`order-2 transition-all duration-1000 ease-out ${
                      isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-12'
                    }`}
                    style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
                  >
                    <h3 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6">
                      {title}
                    </h3>
                    <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
