import { NextRequest, NextResponse } from 'next/server';

const BACKEND =
  process.env.VOICE_API_BACKEND || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  const backendUrl = `${BACKEND}/api/assistant/turn`;

  const resp = await fetch(backendUrl, {
    method: 'POST',
    body: request.body,
    headers: { 'content-type': request.headers.get('content-type') || '' },
    // @ts-expect-error duplex needed for streaming body
    duplex: 'half',
  });

  return new NextResponse(resp.body, {
    status: resp.status,
    headers: { 'content-type': resp.headers.get('content-type') || 'application/json' },
  });
}
