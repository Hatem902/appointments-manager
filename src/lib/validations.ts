import { AppointmentType } from '@prisma/client';
import { z } from 'zod';

const appointmentTypes = [
  AppointmentType.virtual,
  AppointmentType.physical,
] as const;

export const appointmentPostSchema = z.object({
  title: z
    .string({
      required_error: 'Please enter the title of your appointment.',
    })
    .min(1, { message: 'Please select the type of your appointment.' }),
  type: z.enum(appointmentTypes, {
    required_error: 'Please select the type of your appointment.',
  }),
  hostId: z.string({
    required_error: 'Please select the host of your appointment.',
  }),
  clientId: z.string({
    required_error: 'Please select the client of your appointment.',
  }),

  location: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});
