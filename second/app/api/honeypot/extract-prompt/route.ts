import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, message } = body

    if (!query && !message) {
      return NextResponse.json({ detail: 'Query or message is required' }, { status: 400 })
    }

    const backendUrl = process.env.HONEYPOT_SMS_API_URL || 'http://localhost:8000'

    const response = await fetch(`${backendUrl}/extract/prompt-injection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query || message,
      }),
    })

    if (!response.ok) {
      console.error('[v0] Extract prompt API error:', response.status, response.statusText)
      return NextResponse.json(
        {
          error: 'Extraction failed',
          status: response.status,
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      status: data.status,
      extraction_result: data.extraction_result,
      timestamp: data.timestamp,
    })
  } catch (error) {
    console.error('[v0] Extract prompt error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
