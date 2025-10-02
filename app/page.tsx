import { Hero } from "@/components/hero"
import { QuestionShowcase } from "@/components/question-showcase"
import { SocialProof } from "@/components/social-proof"
import { HowItWorks } from "@/components/how-it-works"
import { FeatureGrid } from "@/components/feature-grid"
import { FinalCta } from "@/components/final-cta"

export default function Page() {
  return (
    <main className="flex flex-col">
      <Hero />
      <QuestionShowcase />
      {/* <SocialProof /> */}
      <HowItWorks />
      <FeatureGrid />
      {/* <Testimonial /> */}
      <FinalCta />
    </main>
  )
}
