/**
 * Generates time slots between start and end time.
 *
 * @param {string} startTime - Example: "09:00"
 * @param {string} endTime - Example: "18:00"
 * @param {number} interval - Minutes (15, 30, 60...)
 *
 * @returns {Array}
 */

export function generateSlots(startTime, endTime, interval = 15) {
  const slots = [];

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  while (current < end) {
    slots.push({
      time24: current.toTimeString().slice(0, 5),

      time12: current.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),

      enabled: true,
    });

    current = new Date(current.getTime() + interval * 60000);
  }

  return slots;
}