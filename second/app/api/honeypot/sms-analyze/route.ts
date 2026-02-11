import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sender, recipient, timestamp } = body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ detail: 'Message cannot be empty' }, { status: 400 })
    }

    const backendUrl = process.env.HONEYPOT_SMS_API_URL || 'http://localhost:8000'

    const response = await fetch(`${backendUrl}/sms/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sender: sender || 'unknown',
        recipient: recipient || 'unknown',
        timestamp: timestamp || new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error('[v0] Honeypot SMS API error:', response.status, response.statusText)
      return NextResponse.json(
        {
          error: 'SMS analysis failed',
          status: response.status,
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      status: data.status,
      fraud_detected: data.status === 'fraud_detected',
      fraud_confidence: Math.round((data.fraud_confidence || 0) * 100),
      fraud_details: data.fraud_details,
      llm_analysis: data.llm_analysis,
      ip_address: data.ip_address,
    })
  } catch (error) {
    console.error('[v0] SMS analysis error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
