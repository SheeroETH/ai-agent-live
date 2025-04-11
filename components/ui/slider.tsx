"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center py-2", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gradient-to-r from-gray-800 to-gray-700">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="group relative block h-5 w-5 rounded-full bg-black border-2 border-[#1DA1F2] shadow-lg transition-all duration-200">
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#5ab9f5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <span className="absolute inset-[3px] rounded-full bg-black group-hover:bg-gray-900 transition-colors duration-300"></span>
      <span className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(29,161,242,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
