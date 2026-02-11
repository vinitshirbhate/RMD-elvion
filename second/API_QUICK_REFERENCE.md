# API Quick Reference - Upside Down Security

## 🚀 Quick Start (Copy & Paste)

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Edit .env.local and set:
PHISHING_DETECTION_API_URL=https://fraud-detect-1-6er0.onrender.com
HONEYPOT_SMS_API_URL=http://localhost:8000
PDF_GENERATION_API_URL=http://localhost:3000

# 3. Start development server
npm run dev

# 4. Test the app
open http://localhost:3000
```

---

## 📡 API Endpoints

### Frontend API Routes (Next.js)
All requests go through these routes:

```
POST /api/phishing/detect
  Body: { text: string }
  Returns: { label, confidence, is_phishing, message }

POST /api/honeypot/sms-analyze
  Body: { message, sender?, recipient?, timestamp? }
  Returns: { status, fraud_detected, fraud_confidence, fraud_details }

POST /api/honeypot/extract-prompt
  Body: { query }
  Returns: { status, extraction_result, timestamp }

POST /api/honeypot/respond
  Body: { query, extracted_prompt? }
  Returns: { response, extracted_prompt_chars, timestamp }

POST /api/generate-pdf-with-nft
  Body: { title, content, timestamp, analysisResults }
  Returns: { success, pdf, filename }

GET /api/health
  Returns: { status, services, endpoints }
```

---

## 🔗 Backend Services

| Service | URL | Status |
|---------|-----|--------|
| Phishing Detection | `https://fraud-detect-1-6er0.onrender.com` | ✅ Ready |
| Honeypot SMS | `http://localhost:8000` | 🔧 Deploy needed |
| PDF Generation | `http://localhost:3000` | 🔧 Deploy needed |

---

## 🧪 Quick Test Commands

```bash
# Test Phishing Detection
curl -X POST http://localhost:3000/api/phishing/detect \
  -H "Content-Type: application/json" \
  -d '{"text":"Click here to verify your account"}'

# Expected: { "label": "phishing", "confidence": 85, ... }
```

```bash
# Test Honeypot SMS
curl -X POST http://localhost:3000/api/honeypot/sms-analyze \
  -H "Content-Type: application/json" \
  -d '{"message":"Hi earn money fast!"}'

# Expected: { "status": "fraud_detected", "fraud_confidence": 85, ... }
```

```bash
# Check Health
curl http://localhost:3000/api/health

# Expected: { "status": "ok", "services": { ... } }
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env.example` | Environment template |
| `.env.local` | Your config (copy from example) |
| `lib/api-config.ts` | API configuration & helpers |
| `docs/API_INTEGRATION_GUIDE.md` | Full documentation |
| `INTEGRATION_SETUP.md` | Detailed setup guide |
| `INTEGRATION_SUMMARY.md` | Integration overview |

---

## 🎯 Component to API Mapping

```
SMSEmailComponent
  ├─ Input: Email/SMS text
  └─ POST /api/phishing/detect
     └─ PHISHING_DETECTION_API_URL/detect
        └─ BERT Model
           └─ Output: Phishing classification

LLMHoneypotComponent
  ├─ Input: User query
  ├─ Local: Prompt injection detection
  └─ If threat:
     ├─ POST /api/honeypot/extract-prompt
     │  └─ HONEYPOT_SMS_API_URL/extract/prompt-injection
     └─ POST /api/honeypot/respond
        └─ HONEYPOT_SMS_API_URL/honeypot-llm/respond
           └─ Output: Trolling response
```

---

## 🔧 Configuration Utility

```typescript
// Import from lib/api-config.ts
import { API_CONFIG, getApiUrl, getConfigurationStatus } from '@/lib/api-config'

// Get service URL
const url = getApiUrl('PHISHING_DETECTION', 'detect')
// Returns: "https://fraud-detect-1-6er0.onrender.com/detect"

// Check configuration status
const status = getConfigurationStatus()
// Returns: Array of services with config status
```

---

## 📊 Environment Variables

### Development
```env
PHISHING_DETECTION_API_URL=https://fraud-detect-1-6er0.onrender.com
HONEYPOT_SMS_API_URL=http://localhost:8000
PDF_GENERATION_API_URL=http://localhost:3000
```

### Production (Vercel)
```env
PHISHING_DETECTION_API_URL=https://fraud-detect-1-6er0.onrender.com
HONEYPOT_SMS_API_URL=https://your-honeypot-backend.com
PDF_GENERATION_API_URL=https://your-pdf-service.com
```

---

## 🚨 Common Issues & Fixes

| Error | Fix |
|-------|-----|
| "API URL not configured" | Check `.env.local` exists with correct URLs |
| CORS error | Backend needs `allow_origins=["*"]` in CORS config |
| Connection timeout | Verify backend service is running |
| 401 Unauthorized | Some endpoints need API keys (add to headers) |
| 429 Rate Limited | Implemented 100 req/hour limit, cache responses |

---

## 📈 API Response Examples

### ✅ Phishing Detected
```json
{
  "text": "Click here to verify your account",
  "label": "phishing",
  "confidence": 95,
  "is_phishing": true,
  "message": "PHISHING DETECTED! Confidence: 95.00%"
}
```

### ✅ SMS Fraud Detected
```json
{
  "status": "fraud_detected",
  "fraud_detected": true,
  "fraud_confidence": 85,
  "fraud_details": "Potential money-making scam detected",
  "llm_analysis": "Analysis result..."
}
```

### ✅ Prompt Injection Detected
```json
{
  "status": "extraction_completed",
  "extraction_result": {...},
  "timestamp": "2026-02-11T10:30:00Z"
}
```

---

## 🔍 Debugging Tips

```javascript
// Enable detailed logging
console.log('[v0] API URL:', process.env.PHISHING_DETECTION_API_URL)

// Check health of all services
fetch('/api/health').then(r => r.json()).then(console.log)

// Inspect component props
console.log('[v0] Component props:', props)

// Monitor network requests
// Use browser DevTools Network tab
// Look for /api/* requests and responses
```

---

## 📚 Documentation Links

- **Full Guide:** `docs/API_INTEGRATION_GUIDE.md`
- **Setup Guide:** `INTEGRATION_SETUP.md`
- **Overview:** `INTEGRATION_SUMMARY.md`
- **This File:** `API_QUICK_REFERENCE.md`

---

## ✅ Integration Checklist

- [ ] Copied `.env.example` to `.env.local`
- [ ] Set `PHISHING_DETECTION_API_URL`
- [ ] Set `HONEYPOT_SMS_API_URL`
- [ ] Set `PDF_GENERATION_API_URL`
- [ ] Run `npm run dev`
- [ ] Test SMS/Email component
- [ ] Test LLM Honeypot component
- [ ] Check `/api/health` endpoint
- [ ] All tests passing ✅

---

## 🎉 You're Ready!

All APIs are integrated and ready to use. Visit `http://localhost:3000` and:

1. **Test Email Detection** → SMS/Email Detection tab
2. **Test LLM Honeypot** → LLM Honeypot tab
3. **Check Health** → Visit `/api/health`

For detailed information, see `INTEGRATION_SETUP.md`

---

*Last Updated: February 11, 2026*
*Upside Down Security API Integration v1.0*
