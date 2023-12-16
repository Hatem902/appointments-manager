import { db } from '@/lib/db';
import { appointmentPostSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      select: {
        client: true,
        host: true,
        id: true,
        location: true,
        startTime: true,
        endTime: true,
        title: true,
        type: true,
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appointment = appointmentPostSchema.parse(body);

    const createdAppointment = await db.appointment.create({
      data: {
        title: appointment.title,
        type: appointment.type,
        location: appointment.location,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        host: { connect: { id: appointment.hostId } },
        client: { connect: { id: appointment.clientId } },
      },
      select: {
        id: true,
        title: true,
        type: true,
        location: true,
        startTime: true,
        endTime: true,
        client: true,
        host: true,
      },
    });

    return NextResponse.json(createdAppointment);
  } catch (error) {
    return NextResponse.json(
      error instanceof z.ZodError
        ? error.issues
        : { error: 'Internal server error.' },
      { status: error instanceof z.ZodError ? 422 : 500 }
    );
  }
}
