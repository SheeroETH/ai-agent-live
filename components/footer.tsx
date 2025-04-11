import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 lg:py-20 border-t border-purple-500/20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.03)_0%,transparent_70%)] z-0"></div>
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold gradient-text neon-glow">Tweezy</div>
            </Link>
            <p className="text-muted-foreground">Create an AI-powered Twitter agent in just a few clicks.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-purple-500/20 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Tweezy. All rights reserved.</p>
          <div className="mt-2 text-xs flex items-center justify-center">
            <span className="mr-2">Made with</span>
            <span className="text-blue-500">♥</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
