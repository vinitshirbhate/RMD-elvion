'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Mail, Send, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

export default function SMSEmailComponent() {
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    threat_level: string
    confidence: number
    indicators: string[]
  } | null>(null)

  const handleAnalyze = async () => {
    if (!content.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/phishing/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Detection API error: ${response.statusText}`)
      }

      const data = await response.json()
      
      let threatLevel = 'LOW'
      if (data.confidence >= 80) {
        threatLevel = 'CRITICAL'
      } else if (data.confidence >= 60) {
        threatLevel = 'HIGH'
      } else if (data.confidence >= 40) {
        threatLevel = 'MEDIUM'
      }

      setResult({
        threat_level: data.is_phishing ? threatLevel : 'SAFE',
        confidence: data.confidence,
        indicators: data.is_phishing ? [data.message] : ['No threats detected'],
      })
    } catch (error) {
      console.error('[v0] SMS/Email analysis error:', error)
      setResult({
        threat_level: 'ERROR',
        confidence: 0,
        indicators: [String(error)],
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl mb-2">Email & SMS Detection</h1>
            <p className="text-muted-foreground">
              Paste suspicious emails or SMS content for instant analysis
            </p>
          </div>

          <Card className="p-8">
            {!result ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email/SMS Content</label>
                  <Textarea
                    placeholder="Paste the suspicious email or SMS content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-48 bg-background border-border resize-none"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={!content.trim() || isAnalyzing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Mail className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display font-bold text-lg">Analysis Result</h3>
                        <Badge
                          className={
                            result.threat_level === 'HIGH'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-green-500/20 text-green-400'
                          }
                        >
                          {result.threat_level}
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Confidence Level</p>
                        <div className="text-2xl font-display font-bold text-primary">
                          {result.confidence}%
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Detected Threats:</p>
                        <ul className="space-y-1">
                          {result.indicators.map((indicator, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 bg-primary rounded-full" />
                              {indicator}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setResult(null)
                    setContent('')
                  }}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Analyze Another
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
