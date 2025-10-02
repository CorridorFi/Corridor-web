"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ShieldCheck, TrendingUp, Network, Rows3 } from "lucide-react"

const features = [
  {
    title: "Atomic Bulk Payments",
    description: "Pay 1 or 1,000 people in a single, secure transaction for a fraction of a penny.",
    Icon: Rows3,
    imageSrc: "/download.jpg",
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
  const [visible, setVisible] = useState<boolean[]>(Array(features.length).fill(false))
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-row-index"))
          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev
              const next = [...prev]
              next[idx] = true
              return next
            })
          }
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    )
    rowRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section aria-labelledby="features-heading" className="overflow-x-hidden">
      <div className="container mx-auto px-2 md:px-3 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center px-2">
          <h2 id="features-heading" className="text-3xl font-semibold md:text-4xl">
            {"Key Features"}
          </h2>
          <p className="mt-3 text-muted-foreground">{"What makes Corridor fast, secure, and user-friendly."}</p>
        </div>

        <div className="mt-10 space-y-8 max-w-5xl mx-auto px-1">
          {features.map(({ title, description, imageSrc }, i) => {
            return (
              <div
                key={title}
                ref={(el) => { rowRefs.current[i] = el }}
                data-row-index={i}
                className={[
                  "relative h-64 md:h-72 w-full rounded-xl overflow-hidden transition-all duration-700 ease-out",
                  visible[i] ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-110",
                ].join(" ")}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                {/* Background Image - Full Coverage */}
                <div className={[
                  "absolute inset-0 w-full h-full transition-transform duration-700 ease-out",
                  visible[i] ? "scale-100" : "scale-125"
                ].join(" ")}
                style={{ transitionDelay: `${i * 140}ms` }}
                >
                  <Image
                    src={imageSrc}
                    alt={`${title} illustration`}
                    fill
                    className="object-contain opacity-40"
                    sizes="100vw"
                  />
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div className={[
                  "absolute inset-0 bg-gradient-to-r",
                  i % 2 === 0 
                    ? "from-background/95 via-background/80 to-transparent" 
                    : "from-transparent via-background/80 to-background/95"
                ].join(" ")}></div>

                {/* Text Content - Positioned on Top */}
                <div className={[
                  "relative z-10 h-full flex items-center",
                  i % 2 === 0 ? "justify-start pl-3 md:pl-4" : "justify-end pr-3 md:pr-4"
                ].join(" ")}>
                  <div className={[
                    "max-w-xs md:max-w-sm p-3 md:p-4 rounded-xl backdrop-blur-sm transition-all duration-700 ease-out",
                    "bg-background/60 border border-border/50 shadow-lg",
                    i % 2 === 0 ? "text-left" : "text-right",
                    visible[i] ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 140 + 100}ms` }}
                  >
                    <div className={[
                      "flex items-center gap-3",
                      i % 2 === 0 ? "justify-start" : "justify-end"
                    ].join(" ")}>
                      <h3 className="text-lg font-semibold">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>

                {/* Foreground Image - Overlapping */}
                <div className={[
                  "absolute top-1/2 -translate-y-1/2 w-4/5 md:w-2/3 h-4/5 md:h-2/3 transition-all duration-500 ease-out",
                  i % 2 === 0 ? "right-0 md:right-2" : "left-0 md:left-2",
                  visible[i] ? "scale-100 opacity-100" : "scale-115 opacity-0"
                ].join(" ")}
                style={{ transitionDelay: `${i * 140 + 50}ms` }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={imageSrc}
                      alt={`${title} illustration`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="66vw"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
