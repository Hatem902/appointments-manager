import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const vendors = await db.vendor.findMany({});
    return NextResponse.json(vendors);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
