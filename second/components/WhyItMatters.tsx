'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    value: '$4.45M',
    label: 'Average breach cost from the other side',
  },
  {
    value: '82%',
    label: 'Increase in cyber threats yearly',
  },
  {
    value: '1.3M',
    label: 'Phishing emails sent daily',
  },
  {
    value: '3.6s',
    label: 'Time to compromise after breach',
  },
]

export default function WhyItMatters() {
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
            Why This Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The threat from the Upside Down is real. Protect your organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-8 rounded-lg border border-border bg-background text-center"
            >
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary mb-3">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-12 rounded-lg border-l-4 border-primary bg-primary/5"
        >
          <h3 className="font-display font-bold text-2xl mb-4">
            Early Detection Saves Everything
          </h3>
          <p className="text-lg text-muted-foreground">
            Organizations using Upside Down Security reduce breach costs by 60%, contain incidents 10x faster, and prevent 99.2% of phishing attacks before they reach users. In today's threat landscape, every second counts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
