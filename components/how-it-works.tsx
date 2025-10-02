"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const steps = [
  {
    title: "Upload & Pay",
    description:
      "Simply upload your payroll CSV and pay your entire global team instantly with one click.",
  },
  {
    title: "Receive Instantly",
    description:
      "Team members get funds immediately in their digital wallets—no waiting, no delays.",
  },
  {
    title: "Auto-Invest",
    description:
      "Set your percentage and watch your savings grow automatically in high-yield DeFi protocols.",
  },
  {
    title: "Transfer Seamlessly",
    description:
      "Send money anywhere, anytime with near-zero fees through our secure network.",
  },
  {
    title: "Scale Effortlessly",
    description:
      "Grow your global workforce without payment complexity—Corridor handles everything.",
  },
]

export function HowItWorks() {
  const [visible, setVisible] = useState<boolean[]>(Array(steps.length).fill(false))
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce) {
      setVisible(Array(steps.length).fill(true))
      return
    }

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
          }
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    )

    itemsRef.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section aria-labelledby="how-heading">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/corridor.png"
              alt="Corridor"
              width={64}
              height={64}
              className="h-16 w-16"
            />
          </div>
          <h2 id="how-heading" className="text-3xl font-semibold md:text-4xl">
            {"How Corridor Works"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {"Five simple steps to revolutionize your global payments—fast, secure, and effortless."}
          </p>
        </div>

        <ol role="list" className="relative mx-auto mt-12 max-w-4xl space-y-10">
          <div aria-hidden="true" className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />
          {steps.map(({ title, description }, i) => (
            <li
              key={title}
              ref={(el) => {
                itemsRef.current[i] = el
              }}
              data-step-index={i}
              className={[
                "relative pl-12 transition-all duration-500 ease-out",
                visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              ].join(" ")}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-lg ring-4 ring-primary/20"
              >
                {i + 1}
              </span>

              <div className="min-h-[4rem]">
                <h3 className="text-xl font-bold leading-tight text-foreground">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
              </div>

              {i < steps.length - 1 && <div aria-hidden="true" className="mt-10 h-px w-full bg-border/50" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
