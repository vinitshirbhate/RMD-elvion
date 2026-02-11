'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Submit to Lab',
    description: 'Send suspicious emails, links, or content to our Hawkins Lab for analysis.',
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Our Demogorgon-class AI engine scans for malicious patterns and anomalies.',
  },
  {
    number: '03',
    title: 'Instant Report',
    description: 'Get detailed results with threat scores and recommended actions.',
  },
  {
    number: '04',
    title: 'Auto-Response',
    description: 'System automatically isolates threats and notifies your team in real-time.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6 text-balance">
            The Protocol
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four steps to secure your network from the other side
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <div className="p-6 rounded-lg border border-border bg-background h-full">
                <div className="font-display font-bold text-3xl text-primary mb-3 opacity-50">
                  {step.number}
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Highlight box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-8 rounded-lg border border-primary/30 bg-primary/5 text-center"
        >
          <p className="text-lg font-medium">
            <span className="text-primary">99.2% detection rate</span> with <span className="text-primary">zero false positives</span> in lab conditions
          </p>
        </motion.div>
      </div>
    </section>
  )
}
