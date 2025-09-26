import { Card, CardContent } from "@/components/ui/card"

export function Testimonial() {
  return (
    <section aria-labelledby="testimonial-heading">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border border-border/60 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <h2 id="testimonial-heading" className="sr-only">
                {"Testimonial"}
              </h2>
              <figure className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                <img
                  src="/professional-headshot.png"
                  alt="Sarah Chen headshot"
                  className="h-16 w-16 rounded-full border border-border object-cover md:h-24 md:w-24"
                />
                <blockquote className="text-lg md:text-xl">
                  {
                    "“Corridor cut our international contractor payment time from 3 days to 3 seconds. It's a game-changer for our remote team.”"
                  }
                </blockquote>
              </figure>
              <figcaption className="mt-4 md:mt-6">
                <p className="font-medium">{"Sarah Chen"}</p>
                <p className="text-sm text-muted-foreground">{"CEO at GlobalScale Inc."}</p>
              </figcaption>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
