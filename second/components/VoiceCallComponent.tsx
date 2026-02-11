'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Phone, Mic, MicOff } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VoiceCallComponent() {
  const [isRecording, setIsRecording] = useState(false)
  const [callDuration, setCallDuration] = useState('00:00')

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl mb-2">Voice Call Detection</h1>
            <p className="text-muted-foreground">
              Analyze voice calls for phishing, social engineering, and vishing attempts
            </p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              {/* Status Display */}
              <div className="p-6 rounded-lg bg-card border border-border text-center">
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                      isRecording
                        ? 'bg-primary/20 animate-pulse'
                        : 'bg-primary/10'
                    }`}
                  >
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h2 className="font-display font-bold text-2xl mb-2">
                  {isRecording ? 'Recording...' : 'Ready'}
                </h2>
                <p className="text-muted-foreground mb-4">{callDuration}</p>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex-1 font-semibold ${
                    isRecording
                      ? 'bg-red-600/80 hover:bg-red-700'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  size="lg"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      End Call
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Start Call
                    </>
                  )}
                </Button>
              </div>

              {/* Info */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  This tool analyzes voice call content for phishing indicators, social engineering tactics, and vishing attempts in real-time.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
