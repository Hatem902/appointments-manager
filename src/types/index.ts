const AppointmentTypes = ['virtual', 'physical'] as const;
type AppointmentType = (typeof AppointmentTypes)[number];
