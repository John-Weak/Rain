import { useEffect, useState } from "react";
import BobMemeFace from "../components/bobMemeFace";
import { getLocaleDateTimeString } from "../helpers/dateTime";
import { useLatestOutage, API, WS } from "../helpers/swr";
import { OutageRecord } from "../types/outage";
import { useSWRConfig } from "swr";
export default function Live() {
  const [useOutage, setOutage] = useState<boolean>();
  const [useOutageDate, setOutageDate] = useState<OutageRecord>();
  const { data, isError, isLoading } = useLatestOutage();
  const [useWsLoading, setWsLoading] = useState<boolean>(true);
  const { mutate: swrMutate } = useSWRConfig();

  useEffect(() => {
    function outageWS(msg: MessageEvent<any>) {
      //setOutage(msg.data == "dead");
      setOutage(false);
      swrMutate(`${API}latest?count=7`);
    }
    let c = new WebSocket(WS);
    c.onopen = function () {
      setWsLoading(false);
    };
    c.onmessage = outageWS;
  }, []);

  useEffect(() => {
    if (data) {
      const start = getLocaleDateTimeString(data[0].Start);
      const end = getLocaleDateTimeString(data[0].End);
      const total = data[0].Total;
      setOutageDate({
        End: end,
        Start: start,
        Total: total,
        Id: "",
      });
    }
  }, [data]);

  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div className="flex justify-center my-4 xl:my-8 text-center">
      <div>
        <div className="mb-8 sm:mb-16 text-3xl sm:text-7xl leading-none tracking-tight font-bold  text-slate-200 ">
          <span className="animate-pulse text-red-100">Live</span> Electricity
          Status
        </div>
        <div className="w-36 h-36 sm:w-64 sm:h-64 m-auto">
          {useWsLoading ? (
            <div className="frost-loader h-full"></div>
          ) : (
            BobMemeFace(useOutage ? 1 : 0)
          )}
        </div>
        <div className="mt-2 mb-8 sm:mb-14 sm:mt-2 text-3xl sm:text-7xl leading-none tracking-tight font-extrabold">
          {useWsLoading ? (
            <div className="frost-loader h-8 sm:h-16"></div>
          ) : (
            <>
              {useOutage ? (
                <div className="text-red-500">Outage is live</div>
              ) : (
                <div className="text-green-500">No outage currently</div>
              )}
            </>
          )}
        </div>

        <div className="flex  justify-center items-center">
          <div className="px-10 py-8 sm:px-16 sm:py-10 bg-transparent bg-opacity-[0.2] backdrop-blur-sm rounded border-slate-600 border-sla border-2 ">
            {!useOutage && (
              <div className="text-3xl font-semibold pb-2 ">Last Outage</div>
            )}
            <div>
              <div className="text-xl sm:text-3xl font-medium text-sky-400 p-2">
                Started At:
              </div>
              <div
                className={`sm:text-2xl pb-2 ${
                  isLoading ? "frost-loader h-4 sm:h-6" : ""
                }`}
              >
                {useOutageDate?.Start}
              </div>
              <div className="text-xl sm:text-3xl font-medium text-pink-400 p-2">
                {useOutage ? "Total duration till now" : "Total duration"}
              </div>
              <div
                className={`sm:text-2xl pb-2 ${
                  isLoading ? "frost-loader h-4 sm:h-6" : ""
                }`}
              >
                {useOutageDate?.Total && (
                  <>
                    {(useOutageDate.Total / 60).toFixed(1)}
                    mins ~ {(useOutageDate.Total / 3600).toFixed(1)}
                    hrs
                  </>
                )}
              </div>
              {!useOutage && (
                <>
                  <div className="text-xl sm:text-3xl font-medium text-teal-400 p-2">
                    Ended At:
                  </div>
                  <div
                    className={`sm:text-2xl pb-2 ${
                      isLoading ? "frost-loader h-4 sm:h-6" : ""
                    }`}
                  >
                    {useOutageDate?.End}
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
