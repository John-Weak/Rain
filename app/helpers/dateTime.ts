export function getLocaleDateTimeString(
  val: string,
  timeZone = "Asia/Kolkata"
) {
  return new Date(val).toLocaleString(undefined, {
    timeZone: timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "long",
    year: "2-digit",
  });
}
