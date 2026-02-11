'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Brain, Lock } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Demogorgon AI Detection',
    description: 'Neural networks trained to recognize threats from the other side with unparalleled accuracy.',
  },
  {
    icon: Shield,
    title: 'Multi-Channel Protection',
    description: 'Protect across email, SMS, voice calls, video, and chat platforms simultaneously.',
  },
  {
    icon: Zap,
    title: 'Real-Time Analysis',
    description: 'Analyze and respond to threats in milliseconds before damage occurs.',
  },
  {
    icon: Lock,
    title: 'Quantum-Resistant Security',
    description: 'Military-grade encryption with post-quantum cryptography algorithms.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6 text-balance">
            Lab Capabilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Weaponized against the threats of the Upside Down
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative p-8 rounded-lg border border-border bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer hover:border-primary/50"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
