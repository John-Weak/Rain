export function getPoint(payloadDate: string, timeZone = "Asia/Kolkata") {
  const rawDate = new Date(payloadDate)
    .toLocaleDateString("en-IN", {
      timeZone: timeZone,
      day: "2-digit",
      weekday: "long",
    })
    .split("/");

  let day = DayNumber(rawDate[0].split(" ")[0]);
  let date = parseInt(rawDate[0].split(" ")[1]);

  let originalDay = date % 7 != 0 ? (date % 7) - 1 : 7 - 1;

  let offsetDay = day - originalDay;
  if (offsetDay < 0) offsetDay += 7;

  date += offsetDay;
  const div = date % 7 == 0 ? 8 : 7;
  const y = (date / div) | 0;

  return { x: day, y: y };
}

console.log(getPoint("2022-08-20T16:29:16.572+00:00"));

function DayNumber(day: string) {
  switch (day) {
    case "Sunday":
      return 0;
    case "Monday":
      return 1;
    case "Tuesday":
      return 2;
    case "Wednesday":
      return 3;
    case "Thursday":
      return 4;
    case "Friday":
      return 5;
    case "Saturday":
      return 6;
    default:
      throw Error("Invalid day");
  }
}

function DayName(day: number) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
