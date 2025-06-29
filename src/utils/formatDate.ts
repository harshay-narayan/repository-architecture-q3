import { parse, format } from "date-fns";

/**
 * Formats a date string (any format) to a human-readable string
 * @param dateStr e.g. "2024/08/02" or "2024-08-02"
 */
export function formatDate(dateStr: string): { day: string; date: string } {
  const parsed = parse(dateStr, "yyyy/MM/dd", new Date());
  return {
    day: format(parsed, "EEEE"), // e.g. "Friday"
    date: format(parsed, "dd MMM"), // e.g. "02 Aug"
  };
}
