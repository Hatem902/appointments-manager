import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Appointment, AppointmentType } from '@prisma/client';
import { cn, formatDate, formatTime } from '@/lib/utils';
import { Pencil, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FC } from 'react';
import { useDeleteAppointmentMutation } from '@/hooks/queries';
import Link from 'next/link';
import { stringify } from 'querystring';

const AppointmentCard: FC<Appointment> = (appointment) => {
  const { mutate: deleteAppointment, isPending } =
    useDeleteAppointmentMutation();
  return (
    <Card
      className={cn(
        'relative p-3 w-80 transition-opacity opacity-100 ',
        isPending && 'opacity-20'
      )}
    >
      <Link
        href={{
          pathname: `/edit/${appointment.id}`,
          query: stringify({
            ...appointment,
            startTime:
              appointment.startTime instanceof Date
                ? appointment.startTime.toISOString()
                : appointment.startTime,
            endTime:
              appointment.endTime instanceof Date
                ? appointment.endTime.toISOString()
                : appointment.endTime,
          }),
        }}
      >
        <Pencil className='absolute h-3.5 w-3.5 top-1 right-6 hover:cursor-pointer opacity-30 hover:opacity-100 transition-opacity' />
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <X className='absolute h-4 w-4 top-1 right-1 hover:cursor-pointer opacity-30 hover:opacity-100 transition-opacity' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete appointment &apos;
              {appointment.title}&apos;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteAppointment(appointment.id);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CardHeader>
        <CardTitle className='text-lg font-bold'>{appointment.title}</CardTitle>
      </CardHeader>
      <CardContent className='text-sm'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className='w-4 h-4 text-gray-600' />
            <span>{formatDate(appointment.startTime)}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <ClockIcon className='w-4 h-4 text-gray-600' />
            <span>Start Time: {formatTime(appointment.startTime)}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <ClockIcon className='w-4 h-4 text-gray-600' />
            <span>End Time: {formatTime(appointment.endTime)}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <MapPinIcon className='w-4 h-4 text-gray-600' />
            <span>
              {appointment.type === AppointmentType.virtual
                ? 'Virtual Meeting via Zoom'
                : appointment.location}
            </span>
          </div>
        </div>
        <div className='mt-6'>
          <Button variant='outline'>
            {appointment.type === AppointmentType.virtual
              ? 'Join Meeting'
              : 'Check Location'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
      <line x1='16' x2='16' y1='2' y2='6' />
      <line x1='8' x2='8' y1='2' y2='6' />
      <line x1='3' x2='21' y1='10' y2='10' />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
      <circle cx='12' cy='10' r='3' />
    </svg>
  );
}

function PhoneCallIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
      <path d='M14.05 2a9 9 0 0 1 8 7.94' />
      <path d='M14.05 6A5 5 0 0 1 18 10' />
    </svg>
  );
}

export default AppointmentCard;
