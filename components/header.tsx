"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: pathname === "/" ? "#features" : "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Agent", href: "/agent" },
    { name: "FAQ", href: pathname === "/" ? "#faq" : "/#faq" },
  ]

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-transparent backdrop-blur-none" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-2xl font-bold gradient-text-mixed neon-glow-blue ${
              pathname === "/agent" || pathname === "/publish-agent" ? "hidden" : ""
            }`}
          >
            Tweezy
          </motion.div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <nav className="flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="px-1"
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-md text-sm font-medium text-white hover:text-[#1DA1F2] transition-colors group ${
                    (pathname === "/pricing" && item.name === "Pricing") ||
                    (pathname === "/agent" && item.name === "Agent")
                      ? "text-[#1DA1F2]"
                      : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] transform transition-transform duration-300 ${
                      (pathname === "/pricing" && item.name === "Pricing") ||
                      (pathname === "/agent" && item.name === "Agent")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Right Side - Sign In Button (hidden on agent page) */}
        <div className="flex items-center space-x-4">
          {pathname !== "/agent" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/sign-in">
                <Button
                  size="sm"
                  className="btn-dual-gradient text-white border-none hover:opacity-90 transition-opacity"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="text-white hover:bg-blue-900/20"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/90 backdrop-blur-sm border-b border-blue-900/30"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium py-2 text-white hover:text-[#1DA1F2] transition-colors ${
                    (pathname === "/pricing" && item.name === "Pricing") ||
                    (pathname === "/agent" && item.name === "Agent")
                      ? "text-[#1DA1F2]"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-blue-900/30">
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  <Button className="w-full btn-dual-gradient text-white border-none hover:opacity-90 transition-opacity">
                    Sign In
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
