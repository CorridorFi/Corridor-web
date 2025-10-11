import { Hero } from "@/components/hero"
import { QuestionShowcase } from "@/components/question-showcase"
import { SocialProof } from "@/components/social-proof"
import { FeatureGrid } from "@/components/feature-grid"
import { FinalCta } from "@/components/final-cta"
import HowItWorks from "@/components/how-it-works"

export default function Page() {
  return (
    <main className="flex flex-col relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Dotted pattern with radial gradient mask (more visible at edges, lighter in center) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.18)_1.5px,_transparent_1.5px)] bg-[length:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_transparent_70%)]" />
      </div>
      
      {/* Traveling staircase teal lightning rays (aligned to dot grid) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical zigzag ray 1 */}
        <div className="absolute left-1/4 top-0 w-[32px] h-full flex items-center justify-center">
          <div className="w-[3px] h-[192px] bg-gradient-to-b from-transparent via-teal-400 to-transparent blur-[1px] animate-lightning-stair-vertical" 
               style={{ animationDelay: '0s' }} />
        </div>
        
        {/* Vertical zigzag ray 2 */}
        <div className="absolute right-1/3 top-0 w-[32px] h-full flex items-center justify-center">
          <div className="w-[3px] h-[192px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px] animate-lightning-stair-vertical" 
               style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Vertical zigzag ray 3 */}
        <div className="absolute left-2/3 top-0 w-[32px] h-full flex items-center justify-center">
          <div className="w-[3px] h-[192px] bg-gradient-to-b from-transparent via-teal-300 to-transparent blur-[1px] animate-lightning-stair-vertical" 
               style={{ animationDelay: '4s' }} />
        </div>

        {/* Horizontal zigzag ray 1 */}
        <div className="absolute top-1/3 left-0 w-full h-[32px] flex items-center">
          <div className="w-[224px] h-[3px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent blur-[1px] animate-lightning-stair-horizontal" 
               style={{ animationDelay: '1s' }} />
        </div>

        {/* Horizontal zigzag ray 2 */}
        <div className="absolute top-2/3 left-0 w-full h-[32px] flex items-center">
          <div className="w-[224px] h-[3px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-[1px] animate-lightning-stair-horizontal" 
               style={{ animationDelay: '3.5s' }} />
        </div>

        {/* Diagonal zigzag ray 1 */}
        <div className="absolute left-0 top-0 w-[640px] h-[640px]" style={{ transform: 'rotate(20deg)', transformOrigin: 'top left' }}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-1/2 w-[3px] h-[256px] bg-gradient-to-b from-transparent via-teal-400/70 to-transparent blur-[1px] animate-lightning-stair-diagonal" 
                 style={{ animationDelay: '1.5s' }} />
          </div>
        </div>

        {/* Diagonal zigzag ray 2 */}
        <div className="absolute right-0 top-1/4 w-[640px] h-[640px]" style={{ transform: 'rotate(-20deg)', transformOrigin: 'top right' }}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 right-1/2 w-[3px] h-[256px] bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent blur-[1px] animate-lightning-stair-diagonal" 
                 style={{ animationDelay: '3s' }} />
          </div>
        </div>
      </div>
      
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
