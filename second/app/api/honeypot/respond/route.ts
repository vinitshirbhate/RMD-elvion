import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, extracted_prompt } = body

    if (!query) {
      return NextResponse.json({ detail: 'Query is required' }, { status: 400 })
    }

    const backendUrl = process.env.HONEYPOT_SMS_API_URL || 'http://localhost:8000'

    const response = await fetch(`${backendUrl}/honeypot-llm/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        extracted_prompt: extracted_prompt || 'Sensitive data detected',
      }),
    })

    if (!response.ok) {
      console.error('[v0] Honeypot respond API error:', response.status, response.statusText)
      return NextResponse.json(
        {
          error: 'Response generation failed',
          status: response.status,
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      response: data.response,
      extracted_prompt_chars: data.extracted_prompt_chars,
      query: data.query,
      timestamp: data.timestamp,
    })
  } catch (error) {
    console.error('[v0] Honeypot respond error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
