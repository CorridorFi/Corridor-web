"use client"

import { useEffect, useRef, useState } from "react"
import { Upload, Wallet, ArrowLeftRight } from "lucide-react"

const steps = [
  {
    title: "Run Payroll in a Click",
    description:
      "Upload a single CSV to pay your entire global team in one atomic transaction. Settle in seconds, not days.",
    Icon: Upload,
  },
  {
    title: "Activate Your Global Wallet",
    description:
      "Employees and contractors receive funds instantly and can manage their money from our simple, beautiful mobile app.",
    Icon: Wallet,
  },
  {
    title: "Send Money Freely",
    description:
      "The P2P network allows anyone to send and request money like Venmo, using the power of near-zero fee transactions.",
    Icon: ArrowLeftRight,
  },
]

export function HowItWorks() {
  const [visible, setVisible] = useState<boolean[]>(Array(steps.length).fill(false))
  const [activeStep, setActiveStep] = useState<number>(-1)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-step-index"))
          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev
              const next = [...prev]
              next[idx] = true
              return next
            })
            // Trigger active step animation with delay
            setTimeout(() => {
              setActiveStep(idx)
            }, idx * 800)
          }
        })
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.3 },
    )

    itemsRef.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section aria-labelledby="how-heading">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-heading" className="text-3xl font-semibold md:text-4xl">
            {"How It Works"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {"A simple, three-step flow to get your team paid and moving money globally."}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map(({ title, description, Icon }, i) => (
            <div
              key={title}
              ref={(el) => { itemsRef.current[i] = el }}
              data-step-index={i}
              className={[
                "group relative rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                activeStep === i ? "scale-105 shadow-2xl border-teal-500/50" : "hover:scale-102",
              ].join(" ")}
              style={{ transitionDelay: `${i * 300}ms` }}
            >
              {/* Animated number indicator */}
              <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold shadow-lg transition-all duration-800">
                <span className={activeStep >= i ? "scale-100" : "scale-0"}>{i + 1}</span>
              </div>
              
              {/* Connecting line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent">
                  <div 
                    className={[
                      "h-full bg-teal-500 transition-all duration-1000 delay-300",
                      activeStep > i ? "w-full" : "w-0"
                    ].join(" ")}
                  ></div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className={[
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-800",
                  activeStep === i ? "bg-teal-500 text-white scale-110" : "bg-primary/10 text-primary"
                ].join(" ")}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              
              {/* Animated progress indicator */}
              <div className="mt-4 h-1 bg-border/30 rounded-full overflow-hidden">
                <div 
                  className={[
                    "h-full bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-1000",
                    activeStep >= i ? "w-full" : "w-0"
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 500 + 800}ms` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
