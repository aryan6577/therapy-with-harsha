export function generateTimeSlots(
  startTime,
  endTime,
  duration
) {

  const slots = [];

  const start = new Date();

  const end = new Date();

  const [sh, sm] =
    startTime.split(":");

  const [eh, em] =
    endTime.split(":");

  start.setHours(sh);
  start.setMinutes(sm);

  end.setHours(eh);
  end.setMinutes(em);

  while (start < end) {

    slots.push(
      start
        .toTimeString()
        .substring(0, 5)
    );

    start.setMinutes(
      start.getMinutes() +
      duration
    );

  }

  return slots;

}