import { useEffect, useState } from "react";
import BobMemeFace from "./bobMemeFace";

export default function TodayTotal() {
  const [useOutageMin, setOutageMin] = useState<number>(1);

  // useEffect(() => {
  //   setInterval(() => {
  //     setOutageMin(useOutageMin == 0 ? 9 * 60 : 0);
  //   }, 10000);
  // }, []);

  return (
    <div className="flex justify-center items-center my-8 xl:my-14">
      <div className="text-center ">
        {useOutageMin == 0 ? (
          <div className="m-4 lg:m-12">
            <span className="text-3xl sm:text-7xl leading-none tracking-tight font-extrabold text-center text-slate-200">
              <div className="text-green-500">No Outage</div> Today
            </span>
          </div>
        ) : (
          <div className="m-0 lg:m-8">
            <span className="text-3xl sm:text-7xl leading-none tracking-tight font-extrabold text-center text-slate-200">
              Today's Total Outage{" "}
              <div className="text-red-500">
                {useOutageMin}
                <span className="text-sm sm:text-3xl"> mins</span>{" "}
                <span className="text-2xl sm:text-7xl">~</span>{" "}
                {(useOutageMin / 60).toFixed(1)}
                <span className="text-sm sm:text-3xl">hrs</span>
              </div>
            </span>
          </div>
        )}
      </div>
      <div className="w-36 sm:w-64">{BobMemeFace(useOutageMin)}</div>
    </div>
  );
}
