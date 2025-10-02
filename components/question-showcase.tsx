"use client"

export function QuestionShowcase() {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              What if payroll could do more?
            </h2>
            
            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed mb-5 max-w-3xl mx-auto">
            It can. What if your payday wasn't just an end-of-the-month transaction, but the start of your wealth-building journey? Corridor transforms payroll from a simple payment into a smart financial engine. It pays your global team instantly, while giving them the power to automatically invest, save, and grow their money the moment it arrives
            </p>

            <p className="text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            That's not just payroll. That's financial autopilot.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
