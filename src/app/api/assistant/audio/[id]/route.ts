import { NextRequest, NextResponse } from 'next/server';

const BACKEND =
  process.env.VOICE_API_BACKEND || 'http://localhost:8080';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const backendUrl = `${BACKEND}/api/assistant/audio/${id}`;

  const resp = await fetch(backendUrl);

  if (!resp.ok) {
    return new NextResponse(null, { status: resp.status });
  }

  return new NextResponse(resp.body, {
    status: 200,
    headers: {
      'content-type': resp.headers.get('content-type') || 'audio/mpeg',
      'cache-control': 'no-cache',
    },
  });
}
