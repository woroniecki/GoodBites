export function isToday(day: Date | null): boolean {
  if (!day) return false;
  const today = new Date();
  return day.toDateString() === today.toDateString();
}
