'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          <div>
            <h3 className="font-display font-bold mb-4">Upside Down Security</h3>
            <p className="text-sm text-muted-foreground">
              Protecting networks from threats beyond our dimension.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wide">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-border pt-8 text-center text-sm text-muted-foreground"
        >
          <p>© 2024 Upside Down Security. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Built with ⚡ from the lab. Protecting the world from threats beyond our dimension.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
