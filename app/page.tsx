import { Hero } from "@/components/hero"
import { QuestionShowcase } from "@/components/question-showcase"
import { SocialProof } from "@/components/social-proof"
import { FeatureGrid } from "@/components/feature-grid"
import { FinalCta } from "@/components/final-cta"
import HowItWorks from "@/components/how-it-works"

export default function Page() {
  return (
    <main className="flex flex-col relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Dotted pattern with radial gradient mask (more visible at edges, lighter in center) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.18)_1.5px,_transparent_1.5px)] bg-[length:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_transparent_70%)]" />
      </div>
      {/* Removed ray/streamline overlay */}
      
      {/* Content */}
      <div className="relative z-10">
      <Hero />
      <QuestionShowcase />
      {/* <SocialProof /> */}
      <HowItWorks />
      <FeatureGrid />
      {/* <Testimonial /> */}
      <FinalCta />
      </div>
    </main>
  )
}
