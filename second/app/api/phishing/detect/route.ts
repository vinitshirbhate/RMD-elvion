import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ detail: 'Text cannot be empty' }, { status: 400 })
    }

    const backendUrl = process.env.PHISHING_DETECTION_API_URL || 'https://fraud-detect-1-6er0.onrender.com'

    const response = await fetch(`${backendUrl}/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      console.error('[v0] Phishing API error:', response.status, response.statusText)
      return NextResponse.json(
        {
          error: 'Phishing detection failed',
          status: response.status,
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      text: data.text,
      label: data.label,
      confidence: Math.round(data.confidence * 100),
      is_phishing: data.is_phishing,
      message: data.message,
    })
  } catch (error) {
    console.error('[v0] Phishing detection error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
