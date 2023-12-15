'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { appointmentPostSchema } from '@/lib/validations';
import { AppointmentType } from '@prisma/client';
import {
  useAddAppointmentMutation,
  useBuyersQuery,
  useVendorsQuery,
} from '@/hooks/queries';
import Link from 'next/link';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';
export default function AddAppointment() {
  const { data: hosts } = useVendorsQuery();
  const { data: clients } = useBuyersQuery();
  const { mutate: addAppointment, isPending } = useAddAppointmentMutation();
  const form = useForm<z.infer<typeof appointmentPostSchema>>({
    resolver: zodResolver(appointmentPostSchema),
  });
  function onSubmit(data: z.infer<typeof appointmentPostSchema>) {
    let valid = true;
    if (data.type === AppointmentType.physical && !data.location) {
      form.setError('location', {
        type: 'custom',
        message: 'Location is required for physical appointments.',
      });
      valid = false;
    }
    if (data.endTime.getTime() - data.startTime.getTime() <= 0) {
      form.setError('startTime', {
        type: 'custom',
        message: 'Start time should be scheduled before end time.',
      });
      form.setError('endTime', {
        type: 'custom',
        message: 'End time should be scheduled after start time.',
      });
      valid = false;
    }
    if (!valid) return;
    addAppointment({
      ...data,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    });
  }
  form.watch('type');

  return (
    <main className='w-full max-w-7xl flex flex-col space-y-8 items-center '>
      <h1 className='text-3xl font-bold'>New Appointment</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3  space-y-6'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Type in your appointment title.'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select appointment type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={AppointmentType.virtual}>
                      Virtual
                    </SelectItem>
                    <SelectItem value={AppointmentType.physical}>
                      Physical
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) =>
              form.getValues('type') === AppointmentType.physical ? (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Type in your appointment location.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) : (
                <></>
              )
            }
          />
          {/* TODO: Make client and host comboxes instead of select inputs. */}
          <FormField
            control={form.control}
            name='hostId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select appointment host' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hosts?.map((host) => (
                      <SelectItem key={host.id} value={host.id}>
                        {host.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='clientId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select appointment client' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem value={client.id} key={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO: style date input */}
          <FormField
            control={form.control}
            name='startTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} type='datetime-local' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} type='datetime-local' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex space-x-2 justify-end pt-6'>
            <Link href='/'>
              <Button variant='outline'>
                {' '}
                <ArrowLeft className='mr-2 h-4 w-4' />
                Cancel
              </Button>
            </Link>
            <Button disabled={isPending} type='submit'>
              {isPending ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Plus className='mr-2.5 h-4 w-4' />
              )}
              Add Appointment
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
