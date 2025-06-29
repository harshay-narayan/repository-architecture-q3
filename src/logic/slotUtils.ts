import type { TimeSlot } from "../index";

export function getUniqueDates(slots: TimeSlot[]): string[] {
  const uniqueDates = new Set(slots.map((slot) => slot.date));
  return Array.from(uniqueDates);
}

export function getSlotsForDate(slots: TimeSlot[], selectedDate: string): TimeSlot[] {
  return slots.filter((slot) => slot.date === selectedDate);
}
