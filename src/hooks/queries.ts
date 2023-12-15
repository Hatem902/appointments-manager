'use client';
import { appointmentPostSchema } from '@/lib/validations';
import { Appointment, Buyer, Vendor } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const useAppointmentsQuery = () =>
  useQuery({
    queryKey: ['appointments'],
    queryFn: async (): Promise<Appointment[]> =>
      (await axios.get('/api/appointments')).data,
  });

export const useVendorsQuery = () =>
  useQuery({
    queryKey: ['vendors'],
    queryFn: async (): Promise<Vendor[]> =>
      (await axios.get('/api/vendors')).data,
  });

export const useBuyersQuery = () =>
  useQuery({
    queryKey: ['buyers'],
    queryFn: async (): Promise<Buyer[]> =>
      (await axios.get('/api/buyers')).data,
  });

export const useAddAppointmentMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (appointment: z.infer<typeof appointmentPostSchema>) =>
      await axios.post('/api/appointments', appointment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      router.push('/');
    },
  });
};

export const useEditAppointmentMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (
      appointment: z.infer<typeof appointmentPostSchema> & { id: string }
    ) => await axios.patch(`/api/appointments/${appointment.id}`, appointment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      router.push('/');
    },
  });
};

export const useDeleteAppointmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointmentId: String) => {
      await axios.delete(`/api/appointments/${appointmentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};
