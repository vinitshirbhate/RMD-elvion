'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface HeroProps {
  setActiveComponent: (component: string) => void
}

export default function Hero({ setActiveComponent }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-card/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium text-primary mb-6 tracking-widest uppercase">
            From the Other Side
          </p>
          
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl mb-6 text-balance">
            Something's Wrong in the Network
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
            Advanced AI-powered phishing detection that penetrates the Upside Down. Detect sophisticated threats before they breach your defenses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setActiveComponent('sms-email')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Detect Now
            </Button>
            <Button
              onClick={() => setActiveComponent('audio-video')}
              variant="outline"
              size="lg"
              className="font-semibold"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Animated accent elements */}
        <motion.div
          className="mt-20 flex justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-display font-bold text-primary">99.2%</div>
            <p className="text-xs text-muted-foreground">Detection Rate</p>
          </div>
          <div className="w-px bg-border" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-display font-bold text-primary">Lab Certified</div>
            <p className="text-xs text-muted-foreground">Enterprise Grade</p>
          </div>
          <div className="w-px bg-border" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-display font-bold text-primary">24/7</div>
            <p className="text-xs text-muted-foreground">Monitoring</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
