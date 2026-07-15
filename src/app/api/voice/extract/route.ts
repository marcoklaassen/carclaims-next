import { NextRequest, NextResponse } from 'next/server';

const backendBase = () =>
  process.env.VOICE_API_BACKEND || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  const target = `${backendBase()}/api/voice/extract`;

  const headers = new Headers();
  const ct = request.headers.get('content-type');
  if (ct) headers.set('content-type', ct);

  const res = await fetch(target, {
    method: 'POST',
    body: request.body,
    headers,
    // @ts-expect-error duplex required for streaming request bodies in Node
    duplex: 'half',
  });

  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      'content-type': res.headers.get('content-type') || 'application/json',
    },
  });
}
