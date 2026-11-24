import { timingSafeEqual } from 'node:crypto';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function secretsMatch(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return providedBuffer.length === expectedBuffer.length && timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json({ message: 'Revalidation is not configured on this deployment.' }, { status: 503 });
  }

  const url = new URL(request.url);
  const providedSecret = url.searchParams.get('secret') ?? request.headers.get('x-revalidate-secret');

  if (!providedSecret || !secretsMatch(providedSecret, configuredSecret)) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  revalidateTag('sanity-content');
  revalidatePath('/', 'layout');

  return NextResponse.json({
    revalidated: true,
    at: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to trigger revalidation.' }, { status: 405 });
}
