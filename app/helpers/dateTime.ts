export function getLocaleDateTimeString(
  date: string,
  timeZone = "Asia/Kolkata"
) {
  return new Date(date).toLocaleString(undefined, {
    timeZone: timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export function getLocaleDateString(date: string, timeZone = "Asia/Kolkata") {
  return new Date(date).toLocaleString(undefined, {
    timeZone: timeZone,
    hour12: true,
    hour: "numeric",
    year: "2-digit",
    day: "2-digit",
    month: "short",
  });
}

export function isSameLocaleDate(
  date1: string,
  date2: string | undefined,
  timeZone = "Asia/Kolkata"
) {
  //console.log(date1, date2);
  const d1 = new Date(date1).toLocaleDateString(undefined, {
    timeZone: timeZone,
  });

  let date2_ = date2 == undefined ? new Date() : new Date(date2);
  const d2 = date2_.toLocaleDateString(undefined, {
    timeZone: timeZone,
  });
  //console.log(d1, d2);
  return d1 == d2;
}

export function checkDateis1970(dateString: string) {
  return new Date(0).toISOString() == new Date(dateString).toISOString();
}
