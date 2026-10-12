import { NextResponse } from 'next/server';

const FAVICON_SOURCE = process.env.FAVICON_SOURCE_URL ?? 'https://www.redhat.com/favicon.ico';

export async function GET() {
  const upstream = await fetch(FAVICON_SOURCE, { next: { revalidate: 86400 } });
  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'image/x-icon',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
