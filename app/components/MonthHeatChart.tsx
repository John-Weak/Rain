import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import HeatMap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

if (typeof Highcharts === "object") {
  HeatMap(Highcharts);
  HighchartsExporting(Highcharts);
  accessibility(Highcharts);
}
const techData = (() => {
  let data = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
      if ((i + 1) * (j + 1) > 31) break;
      data.push([i, j, (Math.random() * 10) | 0]);
    }
  }
  return data;
})();

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
  chart: {
    type: "heatmap",
    backgroundColor: "transparent",
    plotBorderWidth: 1,
    margin: [80, 20, 80, 20],
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
      },
    },
    column: {
      borderWidth: 0,
      dataLabels: {
        format: "{point.y} mins",
        color: "white",
      },
    },
  },
  yAxis: {
    reversed: true,
    title: {
      text: null,
    },
    labels: { enabled: false },
    // grid: { enabled: false },
    // gridLineWidth: 0,
  },
  xAxis: {
    //labels: { style: { color: "#E4E4E7" } },
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  colorAxis: {
    min: 0,
    minColor: "#058293",
    maxColor: "#011B1C",
  },
  series: [
    {
      name: "Outage Time (mins)",
      borderWidth: 1,
      type: "heatmap",
      data: techData,
      dataLabels: {
        format: "{point.x} {point.y}",
        enabled: true,
        color: "white",
        style: { fontSize: "14px" },
      },
    },
  ],
};

export default function MonthHeatChart() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [useChartOptions, setChartOptions] = useState({
    ...options,
  });
  return (
    <>
      <div className="sm:pt-10 lg:pt-12">
        <div className="max-w-[1300px] m-auto">
          <div className="px-2 py-2 sm:py-4">
            <span className="text-2xl sm:text-5xl leading-none  font-normal text-gray-200 underline underline-offset-[1rem]">
              Last <span className="text-cyan-500">7</span> Outages
            </span>
          </div>
          {false ? (
            <>
              {[...Array(7)].map((e, i) => (
                <div
                  className="frost-loader w-full h-8 my-5"
                  key={i + "chartLoader"}
                ></div>
              ))}
            </>
          ) : (
            <HighchartsReact
              highcharts={Highcharts}
              options={useChartOptions}
              ref={chartComponentRef}
            />
          )}
        </div>
      </div>
    </>
  );
}
