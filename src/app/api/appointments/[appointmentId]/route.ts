import { db } from '@/lib/db';
import { appointmentPostSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
import { z } from 'zod';

interface Params {
  appointmentId: string;
}

export async function DELETE(
  request: Request,
  { params: { appointmentId } }: { params: Params }
) {
  try {
    await db.appointment.delete({
      where: {
        id: appointmentId,
      },
    });

    return NextResponse.json({ appointmentId, deleted: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params: { appointmentId } }: { params: Params }
) {
  try {
    const body = await request.json();
    const appointment = appointmentPostSchema.parse(body);
    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        ...appointment,
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

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    return NextResponse.json(
      error instanceof z.ZodError
        ? error.issues
        : { error: 'Internal server error.' },
      { status: error instanceof z.ZodError ? 422 : 500 }
    );
  }
}
