/**
 * Centralized API Configuration for Upside Down Security
 * All external API endpoints and their configuration
 */

export const API_CONFIG = {
  // Phishing Detection API (BERT-based)
  PHISHING_DETECTION: {
    baseUrl: process.env.PHISHING_DETECTION_API_URL || 'https://fraud-detect-1-6er0.onrender.com',
    endpoints: {
      detect: '/detect',
      health: '/health',
    },
    description: 'BERT-finetuned phishing detection model',
    rateLimit: '100 requests per hour',
  },

  // Honeypot SMS Fraud Detection
  HONEYPOT_SMS: {
    baseUrl: process.env.HONEYPOT_SMS_API_URL || 'http://localhost:8000',
    endpoints: {
      analyze: '/sms/analyze',
      extractPrompt: '/extract/prompt-injection',
      extractMalicious: '/extract/malicious-llm',
      honeypotRespond: '/honeypot-llm/respond',
      maliciousMessage: '/malicious-llm/message',
      logsInjections: '/logs/injections',
      health: '/health',
    },
    description: 'SMS fraud detection with LLM honeypot capabilities',
    models: ['Google Gemini 2.5 Flash'],
  },

  // PDF Generation API
  PDF_GENERATION: {
    baseUrl: process.env.PDF_GENERATION_API_URL || 'http://localhost:3000',
    endpoint: '/api/generate-pdf-with-nft',
    description: 'PDF security report generation with NFT metadata',
  },

  // Internal API Routes (Next.js)
  INTERNAL: {
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    endpoints: {
      phishingDetect: '/api/phishing/detect',
      honeypotSmsAnalyze: '/api/honeypot/sms-analyze',
      honeypotExtractPrompt: '/api/honeypot/extract-prompt',
      honeypotRespond: '/api/honeypot/respond',
      generatePdf: '/api/generate-pdf-with-nft',
    },
    description: 'Next.js API routes that proxy to backend services',
  },
}

/**
 * Helper function to get API endpoint
 */
export function getApiUrl(service: keyof typeof API_CONFIG, endpoint?: string): string {
  const config = API_CONFIG[service]
  if (!config) {
    throw new Error(`Unknown API service: ${service}`)
  }

  if ('baseUrl' in config) {
    if (endpoint && 'endpoints' in config && config.endpoints) {
      const endpoints = config.endpoints as Record<string, string>
      return `${config.baseUrl}${endpoints[endpoint] || endpoint}`
    }
    return (config as any).baseUrl
  }

  return ''
}

/**
 * API Configuration Summary
 */
export function getConfigurationStatus(): {
  service: string
  status: 'configured' | 'unconfigured'
  baseUrl?: string
}[] {
  return [
    {
      service: 'Phishing Detection API',
      status: API_CONFIG.PHISHING_DETECTION.baseUrl ? 'configured' : 'unconfigured',
      baseUrl: API_CONFIG.PHISHING_DETECTION.baseUrl,
    },
    {
      service: 'Honeypot SMS Fraud Detection',
      status: API_CONFIG.HONEYPOT_SMS.baseUrl ? 'configured' : 'unconfigured',
      baseUrl: API_CONFIG.HONEYPOT_SMS.baseUrl,
    },
    {
      service: 'PDF Generation',
      status: API_CONFIG.PDF_GENERATION.baseUrl ? 'configured' : 'unconfigured',
      baseUrl: API_CONFIG.PDF_GENERATION.baseUrl,
    },
  ]
}
