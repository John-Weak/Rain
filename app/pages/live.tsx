import { useEffect, useState } from "react";
import BobMemeFace from "../components/bobMemeFace";
import { getLocaleDateTimeString } from "../helpers/dateTime";
import { useLatestOutage } from "../helpers/swr";
import { useLatestOutagesStore } from "../stores/latest";
import { OutageRecord } from "../types/outage";

export default function Live() {
  const [useOutage, setOutage] = useState<boolean>(true);
  // const [useOutageDate, setOutageDate] = useState<string>();
  // const { data, isError, isLoading } = useLatestOutage();
  // useEffect(() => {
  //   if (data) {
  //     let dateTime = getLocaleDateTimeString(data[0].Start);
  //     setOutageDate(dateTime);
  //   }
  // }, [data]);

  return (
    <div className="flex justify-center my-4 xl:my-8 text-center">
      <div>
        <div className="mb-8 sm:mb-16 text-3xl sm:text-7xl leading-none tracking-tight font-bold  text-slate-200 underline underline-offset-[0.3em]">
          <span className="">Live</span> Electricity Status
        </div>
        <div className="w-36 sm:w-64 m-auto">
          {BobMemeFace(useOutage ? 1 : 0)}
        </div>
        <div className="mt-2 mb-8 sm:mb-14 sm:mt-2 text-3xl sm:text-7xl leading-none tracking-tight font-extrabold">
          {useOutage ? (
            <div className="text-red-500">Outage is live</div>
          ) : (
            <div className="text-green-500">No outage currently</div>
          )}
        </div>

        <div className="flex justify-center items-center">
          <div className="max-w-fit px-12 py-8 sm:px-16 sm:py-10 bg-transparent bg-opacity-[0.2] backdrop-blur-sm rounded border-slate-600 border-sla border-2 ">
            {!useOutage && (
              <div className="text-3xl font-semibold pb-2">Last Outage</div>
            )}
            <div>
              <div className="text-xl sm:text-3xl font-medium text-sky-400 p-2">
                Started At:
              </div>
              <div className="sm:text-2xl pb-2">03 August 22 at 11:43 am</div>
              <div className="text-xl sm:text-3xl font-medium text-pink-400 p-2">
                {useOutage ? "Total duration till now" : "Total duration"}
              </div>
              <div className="sm:text-2xl pb-2">540 mins ~ 9.0hrs</div>
              {!useOutage && (
                <>
                  <div className="text-xl sm:text-3xl font-medium text-teal-400 p-2">
                    Ended At:
                  </div>
                  <div className="sm:text-2xl pb-2">
                    03 August 22 at 11:43 am
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
