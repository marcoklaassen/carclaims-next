import { NextResponse } from 'next/server';

const LOGO_SOURCE = process.env.LOGO_SOURCE_URL ?? '';

export async function GET() {
  if (!LOGO_SOURCE) {
    return new NextResponse(null, { status: 404 });
  }
  const upstream = await fetch(LOGO_SOURCE, { next: { revalidate: 86400 } });
  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
