import Highcharts, { SeriesOptionsType } from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import { useGreatestOutage } from "../helpers/swr";
import { useEffect, useRef, useState } from "react";
import { float2int } from "../helpers/conversion";
import { getLocaleDateString } from "../helpers/dateTime";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  accessibility(Highcharts);
  HighchartsMore(Highcharts);
}

const options: Highcharts.Options = {
  accessibility: { enabled: true },
  legend: { enabled: false },
  title: { text: undefined },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    useHTML: true,
    pointFormat: "<b>{point.name}:</b> ~ {point.value} min",
  },
  chart: {
    type: "packedbubble",
    backgroundColor: "transparent",
  },
  plotOptions: {
    packedbubble: {
      minSize: "40%",
      maxSize: "150%",
      dataLabels: {
        enabled: true,
        format: "{point.name}",
        style: {
          color: "white",
          textOutline: "none",
          fontWeight: "bold",
        },
      },
    },
  },
};

export default function GreatestOutage() {
  const { data, isError, isLoading } = useGreatestOutage(10);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [useChartOptions, setChartOptions] = useState({
    ...options,
  });

  useEffect(() => {
    if (!data) return;

    console.log(data);
    const series = [] as SeriesOptionsType[];

    for (let i = 0; i < data.length; i++) {
      const minHrAvg = (data[i].Total / 3600).toFixed(1) + " hrs";
      const val = float2int(data[i].Total / 60);
      series.push({
        type: "packedbubble",
        name: getLocaleDateString(data[i].Start),
        data: [
          {
            name: minHrAvg,
            value: val,
          },
        ],
      });
    }
    setChartOptions({
      series: series,
    });
  }, [data]);

  if (isError) return <div>Error: {isError.message}</div>;
  return (
    <div className="sm:pt-10 lg:pt-12">
      <div className="max-w-[1300px] m-auto">
        <div className="px-2 py-2 sm:py-4">
          <span className="text-2xl sm:text-5xl leading-none  font-normal text-gray-200 underline underline-offset-[1rem]">
            <span className="text-cyan-500">10 </span>Major Continuous Outages
          </span>
        </div>
        {isLoading ? (
          <div className="frost-loader w-full h-72 sm:h-96 my-5"></div>
        ) : (
          <HighchartsReact
            highcharts={Highcharts}
            options={useChartOptions}
            ref={chartComponentRef}
          />
        )}
      </div>
    </div>
  );
}
