import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { useLatestOutage } from "../helpers/swr";
import { getLocaleDateString } from "../helpers/dateTime";
import { float2int } from "../helpers/conversion";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  accessibility(Highcharts);
}

const options: Highcharts.Options = {
  lang: {
    decimalPoint: "-",
  },
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
    type: "column",
    backgroundColor: "transparent",
    inverted: true,
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
        color: "#fff",
      },
      pointWidth: 18,
      //maxPointWidth: 20,
    },
  },
  yAxis: {
    title: {
      text: null,
    },
    labels: { enabled: false },
    grid: { enabled: false },
    gridLineWidth: 0,
  },
  xAxis: {
    lineColor: "transparent",
    width: 0,
    lineWidth: 0,
    grid: { enabled: false },
    labels: { style: { color: "#E4E4E7" } },
    categories: [],
  },
  series: [
    {
      name: "Outage Time (mins)",
      type: "column",
      data: [],
      colors: [
        "#14b8a6",
        "#EAB308",
        "#DC2626",
        "#D946EF",
        "#6a5cf6",
        "#84cc16",
        "#16A34A",
      ],
      colorByPoint: true,
    },
  ],
};



function LastSevenChart() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [useChartOptions, setChartOptions] = useState({
    ...options,
  });
  const { data, isError, isLoading } = useLatestOutage();

  useEffect(() => {
    if (!data) return;

    const seriesPoints = [];
    const dateCategories = [];
    for (let i = 0; i < data.length; i++) {
      dateCategories.push(getLocaleDateString(data[i].Start));
      let seriesPoint = data[i].Total / 60;
      seriesPoint = float2int(seriesPoint);
      seriesPoints.push(seriesPoint);
    }
    setChartOptions({
      xAxis: {
        categories: dateCategories,
      },
      series: [
        {
          name: "Outage Time (mins)",
          type: "column",
          data: seriesPoints,
        },
      ],
    });
  }, [data]);

  if (isError) return <div>Error: {isError.message}</div>;
  return (
    <div className="sm:pt-10 lg:pt-12">
      <div className="max-w-[1300px] m-auto">
        <div className="px-2 py-2 sm:py-4">
          <span className="text-2xl sm:text-5xl leading-none  font-normal text-gray-200 underline underline-offset-[1rem]">
            Last <span className="text-cyan-500">7</span> Outages
          </span>
        </div>
        {isLoading ? (
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
  );
}

export default LastSevenChart;
