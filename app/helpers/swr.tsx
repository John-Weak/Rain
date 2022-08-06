import { env } from "process";
import useSWR from "swr";
import { OutageRecord } from "../types/outage";

const API = process.env.API || "http://localhost:8080/";
const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

// export function useStatDump() {
//   // const { data, error } = useSWR(`${API}statdump`, fetcher);
//   const { data, error } = useSWR<outageRecord[]>(
//     "http://localhost:8080/statdump",
//     fetcher
//   );

//   return {
//     statDump: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export function useLatestOutage(count = 7) {
  const { data, error } = useSWR<OutageRecord[]>(
    `${API}latest?count=${count}`,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type WeekendOutage = {
  Day: Days;
  Timing: {
    Start: Date;
    End: Date;
  }[];
  total: number;
};

export type outageRecord = {
  Id: string;
  Start: string;
  End: string;
  Total: number;
};

function tech(input: outageRecord[], locale = "India/Kolkata") {
  let localeData = input.map((val) => {
    return {
      Start: new Date(val.Start).toLocaleString(locale),
      End: new Date(val.Start).toLocaleString(locale),
      Total: val.Total,
      Id: val.Id,
    };
  });

  let outageMap = new Map<Days, WeekendOutage>([
    ["Monday", { Day: "Monday", Timing: [], total: 0 }],
    ["Tuesday", { Day: "Tuesday", Timing: [], total: 0 }],
    ["Wednesday", { Day: "Wednesday", Timing: [], total: 0 }],
    ["Thursday", { Day: "Thursday", Timing: [], total: 0 }],
    ["Friday", { Day: "Friday", Timing: [], total: 0 }],
    ["Saturday", { Day: "Saturday", Timing: [], total: 0 }],
    ["Sunday", { Day: "Sunday", Timing: [], total: 0 }],
  ]);

  localeData.forEach((val) => {
    let day = new Date(val.Start).getDay();
    let a = outageMap.get(DayName(day)!)!.Timing.push({
      Start: new Date(val.Start),
      End: new Date(val.End),
    });
  });
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
