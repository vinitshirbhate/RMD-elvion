'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download } from 'lucide-react'

export default function DemoCard() {
  const [showResults, setShowResults] = useState(false)

  const mockAnalysisResult = {
    threat_level: 'CRITICAL',
    confidence: '99.2%',
    phishing_indicators: [
      'Spoofed sender address',
      'Malicious URL detected',
      'Credential harvesting attempt',
      'Domain impersonation detected',
    ],
    recommended_action: 'ISOLATE_IMMEDIATELY',
    timestamp: new Date().toISOString(),
  }

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6 text-balance">
            See It in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Test our detection engine with a sample malicious email
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-8 bg-card border-border">
            {!showResults ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Sample Email</label>
                  <div className="p-4 bg-background rounded-lg border border-border text-sm">
                    <p className="font-semibold">From:</p>
                    <p className="text-muted-foreground mb-4">security@amaz0n-verify.com</p>
                    <p className="font-semibold">Subject:</p>
                    <p className="text-muted-foreground mb-4">URGENT: Verify Your Account</p>
                    <p className="font-semibold">Body:</p>
                    <p className="text-muted-foreground">
                      Click here to verify: hxxps://amaz0n-verify-now.com/verify?token=...
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setShowResults(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  size="lg"
                >
                  Analyze
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-xl">Analysis Results</h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        mockAnalysisResult.threat_level === 'CRITICAL'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {mockAnalysisResult.threat_level}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Confidence</p>
                      <p className="text-2xl font-display font-bold text-primary">
                        {mockAnalysisResult.confidence}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Detected Threats
                      </p>
                      <ul className="space-y-1">
                        {mockAnalysisResult.phishing_indicators.map((indicator, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Recommended Action
                      </p>
                      <p className="font-mono text-primary text-sm">
                        {mockAnalysisResult.recommended_action}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowResults(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Try Another
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
