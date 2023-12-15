import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const buyers = await db.buyer.findMany({});
    return NextResponse.json(buyers);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
