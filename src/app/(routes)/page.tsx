'use client';
import AppointmentCard from '@/components/appointment-card';
import { Button } from '@/components/ui/button';
import { useAppointmentsQuery } from '@/hooks/queries';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Appointments() {
  const { data: appointments, isLoading } = useAppointmentsQuery();
  return (
    <main className='w-full max-w-[62rem] flex flex-col space-y-10 items-center justify-center '>
      <Link href='/add'>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> Add Appointment
        </Button>
      </Link>
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4  '>
        {/* TODO: Handle loading */}
        {appointments?.map((appointment) => (
          <AppointmentCard {...appointment} key={appointment.id} />
        ))}
      </div>
    </main>
  );
}
