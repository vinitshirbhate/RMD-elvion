import { NextResponse } from 'next/server'

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      phishingDetection: {
        name: 'BERT Phishing Detection API',
        url: process.env.PHISHING_DETECTION_API_URL || 'https://fraud-detect-1-6er0.onrender.com',
        configured: !!process.env.PHISHING_DETECTION_API_URL,
      },
      honeypotSms: {
        name: 'Honeypot SMS Fraud Detection',
        url: process.env.HONEYPOT_SMS_API_URL || 'http://localhost:8000',
        configured: !!process.env.HONEYPOT_SMS_API_URL,
      },
      pdfGeneration: {
        name: 'PDF Generation Service',
        url: process.env.PDF_GENERATION_API_URL || 'http://localhost:3000',
        configured: !!process.env.PDF_GENERATION_API_URL,
      },
    },
    endpoints: {
      phishing: '/api/phishing/detect',
      honeypot: {
        analyze: '/api/honeypot/sms-analyze',
        extract: '/api/honeypot/extract-prompt',
        respond: '/api/honeypot/respond',
      },
      pdf: '/api/generate-pdf-with-nft',
    },
  }

  return NextResponse.json(health)
}
