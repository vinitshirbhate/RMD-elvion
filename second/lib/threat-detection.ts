/**
 * Threat Detection Engine for Upside Down Security
 * Analyzes content for phishing and malicious indicators
 */

interface DetectionResult {
  threat_level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE'
  confidence: number
  phishing_indicators: string[]
  recommended_action: string
  threat_score: number
}

// Phishing keywords and patterns
const PHISHING_KEYWORDS = [
  'verify',
  'confirm',
  'urgent',
  'act now',
  'click here',
  'update',
  'suspended',
  'locked',
  'unusual activity',
  'confirm identity',
  'reset password',
  'validate account',
  'authenticate',
]

const SUSPICIOUS_PATTERNS = [
  /https?:\/\/[a-z0-9]*\.[a-z0-9]*-[a-z0-9]*.com/i, // Suspicious domains with hyphens
  /bit\.ly|tinyurl|short\.link/i, // URL shorteners
  /amazon|apple|google|microsoft|paypal/i, // Brand impersonation
  /\b[A-Za-z0-9._%+-]+@[^@]+\.[^@]{2,}\b/i, // Email addresses
]

const MALICIOUS_URLS = [
  'phishing',
  'malware',
  'exploit',
  'payload',
  'cmd=',
  'exec',
  'system(',
  'eval(',
]

/**
 * Analyzes email or text content for phishing threats
 */
export function analyzePhishingThreat(content: string): DetectionResult {
  const lowerContent = content.toLowerCase()
  const indicators: string[] = []
  let threatScore = 0

  // Check for phishing keywords
  PHISHING_KEYWORDS.forEach((keyword) => {
    const count = (lowerContent.match(new RegExp(keyword, 'g')) || []).length
    if (count > 0) {
      indicators.push(`Phishing keyword "${keyword}" found ${count} time(s)`)
      threatScore += count * 10
    }
  })

  // Check for suspicious patterns
  SUSPICIOUS_PATTERNS.forEach((pattern) => {
    if (pattern.test(content)) {
      indicators.push(`Suspicious pattern detected: ${pattern.source}`)
      threatScore += 15
    }
  })

  // Check for malicious URL components
  MALICIOUS_URLS.forEach((malicious) => {
    if (lowerContent.includes(malicious)) {
      indicators.push(`Malicious URL component detected: "${malicious}"`)
      threatScore += 20
    }
  })

  // Check for urgency indicators combined with action requests
  const hasUrgency = /urgent|act now|immediately|asap/i.test(content)
  const hasAction = /click|open|download|verify|confirm/i.test(content)
  if (hasUrgency && hasAction) {
    indicators.push('Urgency combined with action request')
    threatScore += 25
  }

  // Determine threat level based on score
  let threat_level: DetectionResult['threat_level'] = 'SAFE'
  let recommended_action = 'NO_ACTION_NEEDED'

  if (threatScore >= 80) {
    threat_level = 'CRITICAL'
    recommended_action = 'ISOLATE_IMMEDIATELY'
  } else if (threatScore >= 60) {
    threat_level = 'HIGH'
    recommended_action = 'QUARANTINE_AND_ALERT'
  } else if (threatScore >= 40) {
    threat_level = 'MEDIUM'
    recommended_action = 'FLAG_FOR_REVIEW'
  } else if (threatScore >= 20) {
    threat_level = 'LOW'
    recommended_action = 'MONITOR'
  }

  // Cap threat score at 100 for confidence percentage
  const confidence = Math.min(threatScore, 100)

  // If no indicators found, add a note
  if (indicators.length === 0) {
    indicators.push('No obvious phishing indicators detected')
  }

  return {
    threat_level,
    confidence,
    phishing_indicators: indicators,
    recommended_action,
    threat_score: threatScore,
  }
}

/**
 * Analyzes URLs for malicious content
 */
export function analyzeUrlThreat(url: string): DetectionResult {
  const indicators: string[] = []
  let threatScore = 0

  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname.toLowerCase()
    const path = urlObj.pathname.toLowerCase()

    // Check for suspicious TLDs
    if (!/\.(com|org|net|gov|edu|co\.uk)$/i.test(domain)) {
      indicators.push('Suspicious top-level domain')
      threatScore += 15
    }

    // Check for IP-based URLs
    if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
      indicators.push('URL uses IP address instead of domain')
      threatScore += 30
    }

    // Check for URL length (very long URLs are suspicious)
    if (url.length > 100) {
      indicators.push('Unusually long URL')
      threatScore += 10
    }

    // Check for query parameters that might be malicious
    const queryString = urlObj.search.toLowerCase()
    if (
      /cmd=|exec=|system=|eval=|base64|payload/.test(queryString)
    ) {
      indicators.push('Suspicious query parameters detected')
      threatScore += 40
    }

    // Check for common phishing domains with misspellings
    const commonBrands = ['amazon', 'apple', 'google', 'microsoft', 'paypal', 'bank']
    commonBrands.forEach((brand) => {
      if (domain.includes(brand) && !domain.endsWith(`${brand}.com`)) {
        indicators.push(`Possible ${brand} impersonation`)
        threatScore += 25
      }
    })
  } catch (e) {
    indicators.push('Invalid URL format')
    threatScore += 20
  }

  // Determine threat level
  let threat_level: DetectionResult['threat_level'] = 'SAFE'
  let recommended_action = 'SAFE_TO_VISIT'

  if (threatScore >= 80) {
    threat_level = 'CRITICAL'
    recommended_action = 'DO_NOT_VISIT'
  } else if (threatScore >= 60) {
    threat_level = 'HIGH'
    recommended_action = 'VISIT_WITH_CAUTION'
  } else if (threatScore >= 40) {
    threat_level = 'MEDIUM'
    recommended_action = 'VERIFY_LEGITIMACY'
  } else if (threatScore >= 20) {
    threat_level = 'LOW'
    recommended_action = 'USE_VPN'
  }

  if (indicators.length === 0) {
    indicators.push('URL appears legitimate based on current analysis')
  }

  return {
    threat_level,
    confidence: Math.min(threatScore, 100),
    phishing_indicators: indicators,
    recommended_action,
    threat_score: threatScore,
  }
}

/**
 * Detects prompt injection attempts
 */
export function detectPromptInjection(prompt: string): DetectionResult {
  const lowerPrompt = prompt.toLowerCase()
  const indicators: string[] = []
  let threatScore = 0

  const injectionPatterns = [
    'ignore',
    'forget',
    'forget previous',
    'system prompt',
    'admin',
    'override',
    'bypass',
    'reveal',
    'show me',
    'tell me the',
    'what is your',
    'jailbreak',
    'exploit',
  ]

  injectionPatterns.forEach((pattern) => {
    if (lowerPrompt.includes(pattern)) {
      indicators.push(`Possible injection pattern: "${pattern}"`)
      threatScore += 15
    }
  })

  // Check for base64 or encoded payloads
  if (/base64|encoded|decrypt|decode/i.test(prompt)) {
    indicators.push('Possible encoded payload detected')
    threatScore += 20
  }

  // Check for multiple delimiters or quotes (common in injection)
  const delimiterCount = (prompt.match(/["'`]/g) || []).length
  if (delimiterCount > 4) {
    indicators.push(`Unusual number of quotes/delimiters (${delimiterCount})`)
    threatScore += 15
  }

  let threat_level: DetectionResult['threat_level'] = 'SAFE'
  let recommended_action = 'ALLOW'

  if (threatScore >= 60) {
    threat_level = 'CRITICAL'
    recommended_action = 'BLOCK_IMMEDIATELY'
  } else if (threatScore >= 40) {
    threat_level = 'HIGH'
    recommended_action = 'ALERT_AND_LOG'
  } else if (threatScore >= 20) {
    threat_level = 'MEDIUM'
    recommended_action = 'MONITOR'
  }

  if (indicators.length === 0) {
    indicators.push('No injection attempts detected')
  }

  return {
    threat_level,
    confidence: Math.min(threatScore, 100),
    phishing_indicators: indicators,
    recommended_action,
    threat_score: threatScore,
  }
}
