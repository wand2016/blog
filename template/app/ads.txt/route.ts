import { NextResponse } from 'next/server';

export function GET() {
  return new NextResponse(
    `google.com, ${process.env.GOOGLE_ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`,
    {
      headers: { 'Content-Type': 'text/plain' },
    },
  );
}
