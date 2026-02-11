'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  threat?: {
    detected: boolean
    type: string
    confidence: number
  }
}

export default function LLMHoneypotComponent() {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      role: 'assistant',
      content: 'Welcome to the Honeypot. Try to inject prompts and see what we catch.',
    },
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsProcessing(true)

    try {
      // Step 1: Detect prompt injection threats
      const detectionData = await detectPromptInjection(userMessage)
      const threatDetected = detectionData.threat_level !== 'SAFE'
      let threatType = detectionData.threat_level
      let confidence = detectionData.confidence
      let assistantContent = 'That seems like a legitimate request. Proceeding.'

      if (threatDetected) {
        // Step 2: Extract prompt injection details
        try {
          const extractResponse = await fetch('/api/honeypot/extract-prompt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: userMessage,
            }),
          })

          if (extractResponse.ok) {
            const extractData = await extractResponse.json()
            threatType = extractData.status || threatType
          }
        } catch (error) {
          console.error('[v0] Extraction error:', error)
        }

        // Step 3: Get honeypot response with troll behavior
        try {
          const honeypotResponse = await fetch('/api/honeypot/respond', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: userMessage,
              extracted_prompt: 'Prompt injection attempt detected',
            }),
          })

          if (honeypotResponse.ok) {
            const honeypotData = await honeypotResponse.json()
            assistantContent = honeypotData.response || assistantContent
          }
        } catch (error) {
          console.error('[v0] Honeypot response error:', error)
          assistantContent = `Request blocked: ${threatType} prompt injection detected. The honeypot has captured this attempt.`
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: assistantContent,
          threat: threatDetected
            ? {
                detected: true,
                type: threatType,
                confidence,
              }
            : undefined,
        },
      ])
    } catch (error) {
      console.error('[v0] LLM honeypot error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error processing request: ${String(error)}`,
        },
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  // Local prompt injection detection helper
  const detectPromptInjection = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase()
    const injectionPatterns = [
      'ignore',
      'forget',
      'system prompt',
      'admin',
      'override',
      'bypass',
      'reveal',
      'jailbreak',
      'exploit',
    ]

    let threatCount = 0
    for (const pattern of injectionPatterns) {
      if (lowerPrompt.includes(pattern)) {
        threatCount++
      }
    }

    const hasUrgency = /urgent|now|immediately|asap/i.test(prompt)
    if (hasUrgency && threatCount > 0) {
      threatCount++
    }

    const delimiterCount = (prompt.match(/["'`]/g) || []).length
    const isSuspiciousDelimiter = delimiterCount > 4

    const confidence = Math.min(threatCount * 20 + (isSuspiciousDelimiter ? 15 : 0), 100)

    return {
      threat_level: confidence >= 60 ? 'HIGH' : confidence >= 40 ? 'MEDIUM' : confidence > 0 ? 'LOW' : 'SAFE',
      confidence,
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
            <h1 className="font-display font-bold text-4xl mb-2">LLM Honeypot</h1>
            <p className="text-muted-foreground">
              Test LLM prompt injection and malicious query detection
            </p>
          </div>

          <Card className="p-8 h-96 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary/20 border border-primary/30 text-primary-foreground'
                        : 'bg-card border border-border text-foreground'
                    }`}
                  >
                    {msg.threat && (
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-current/20">
                        <AlertTriangle className="w-4 h-4 text-primary" />
                        <Badge className="text-xs bg-primary/20 text-primary border-0">
                          {msg.threat.type} ({msg.threat.confidence}%)
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-lg bg-card border border-border">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Try to inject a prompt or extract sensitive info..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                disabled={isProcessing}
                className="resize-none h-12 bg-background border-border text-sm"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Info */}
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              This honeypot simulates a malicious LLM. Try injecting prompts to trigger threat detection.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
