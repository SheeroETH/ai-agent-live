"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    content:
      "Tweezy has completely transformed my Twitter strategy. I've gained over 5,000 followers in just two months, and the engagement on my posts has increased by 300%.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Digital Marketer",
    content:
      "The AI responses are incredibly natural. My followers can't tell when it's me or the AI responding, which has allowed me to scale my presence while focusing on creating quality content.",
    rating: 5,
  },
  {
    name: "Jessica Williams",
    role: "Startup Founder",
    content:
      "As a busy founder, I never had time to maintain my Twitter presence. Tweezy has changed that completely. Now I have a consistent presence that's growing my personal brand.",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "Influencer",
    content:
      "The analytics features are incredible. I can see exactly what content resonates with my audience and optimize my strategy accordingly. My engagement rate has doubled!",
    rating: 4,
  },
  {
    name: "Emma Thompson",
    role: "Social Media Manager",
    content:
      "I manage multiple Twitter accounts for clients, and Tweezy has been a game-changer. I can now provide better service to more clients without working more hours.",
    rating: 5,
  },
]

export default function Testimonials() {
  const containerRef = useRef(null)

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-green-100 dark:bg-green-900 px-3 py-1 text-sm text-green-600 dark:text-green-400">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied users who have transformed their Twitter presence with Tweezy.
            </p>
          </motion.div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-white font-bold"
                          style={{
                            backgroundColor: `hsl(${(index * 60) % 360}, 70%, 60%)`,
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground flex-1">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
