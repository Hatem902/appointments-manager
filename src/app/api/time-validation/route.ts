import { db } from '@/lib/db';
import { validateTimeSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appointmentSettings = validateTimeSchema.parse(body);

    const conflictAppointments = await db.appointment.findMany({
      where: {
        AND: [
          {
            AND: [
              {
                startTime: {
                  lt: appointmentSettings.endTime,
                },
              },
              {
                endTime: {
                  gt: appointmentSettings.startTime,
                },
              },
            ],
          },
          {
            OR: [
              { clientId: appointmentSettings.clientId },
              { hostId: appointmentSettings.hostId },
            ],
          },
        ],
      },
    });
    const timeIsValid = appointmentSettings.id
      ? conflictAppointments.filter(
          (appointment) => appointment.id !== appointmentSettings.id
        ).length === 0
      : conflictAppointments.length === 0;
    return NextResponse.json(timeIsValid);
  } catch (error) {
    return NextResponse.json(
      error instanceof z.ZodError
        ? error.issues
        : { error: 'Internal server error.' },
      { status: error instanceof z.ZodError ? 422 : 500 }
    );
  }
}
