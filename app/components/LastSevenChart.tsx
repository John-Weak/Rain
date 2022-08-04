import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import more from "highcharts/highcharts-more";
import highcharts3d from "highcharts/highcharts-3d";
import timeline from "highcharts/modules/timeline";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

if (typeof Highcharts === "object") {
  highcharts3d(Highcharts);
  HighchartsExporting(Highcharts);
  //timeline(Highcharts);
  //more(Highcharts);
}

// const options: Highcharts.Options = {
//   exporting: {
//     enabled: false,
//   },
//   credits: {
//     enabled: false,
//   },
//   chart: {
//     type: "timeline",
//     backgroundColor: "transparent",
//   },
//   title: {
//     text: "RECHIE RENDI",
//   },
//   subtitle: {
//     text: 'Info source: <a href="https://dmg.johnweak.dev/">www.dmg.johnweak.dev</a>',
//   },
//   xAxis: {
//     //type: "datetime",
//     visible: false,
//   },
//   yAxis: {
//     visible: false,
//   },
//   series: [
//     {
//       type: "timeline",

//       /*
//          {
//           x: 0,
//           low: new Date("2022-08-03T06:13:57.409+00:00").getUTCSeconds(),
//           high: new Date("2022-08-03T07:35:42.356+00:00").getUTCSeconds(),
//           y: new Date("2022-08-03T06:13:57.409+00:00").getUTCSeconds(),
//         },
//         {
//           x: 1,
//           low: new Date("2022-08-02T04:59:46.980+00:00").getUTCSeconds(),
//           high: new Date("2022-08-02T14:18:52.375+00:00").getUTCSeconds(),
//           y: new Date("2022-08-02T04:59:46.980+00:00").getUTCSeconds(),
//           color: "#ffae3d",
//         },
//          */
//       data: [
//         {
//           x: new Date("2022-08-03T06:13:57.409+00:00").getUTCSeconds(),
//           length:
//             new Date("2022-08-03T07:35:42.356+00:00").getUTCSeconds() -
//             new Date("2022-08-03T06:13:57.409+00:00").getUTCSeconds(),
//           label: `${new Date(
//             "2022-08-03T06:13:57.409+00:00"
//           ).toLocaleString()}`,
//         },
//         {
//           x: new Date("2022-08-02T04:59:46.980+00:00").getUTCSeconds(),
//           length:
//             new Date("2022-08-02T14:18:52.375+00:00").getUTCSeconds() -
//             new Date("2022-08-02T04:59:46.980+00:00").getUTCSeconds(),
//           label: `${new Date(
//             "2022-08-02T04:59:46.980+00:00"
//           ).toLocaleString()}`,
//         },
//       ],
//     },
//   ],
// };

const options: Highcharts.Options = {
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
  },

  plotOptions: {
    column: {
      borderColor: "black",
      borderWidth: 0,
      borderRadius: 5,
    },
  },
  yAxis: {
    title: {
      text: "Minutes",
      textAlign: "center",
      style: { color: "#71717A" },
    },
    grid: { enabled: false },
    width: 0,
    lineWidth: 0,
  },
  xAxis: {
    lineColor: "transparent",
    labels: { style: { color: "#A1A1AA" } },
    categories: [
      "6 Jan 2022",
      "6 Jan 2022",
      "7 Jan 2022",
      "6 Jan 2022",
      "6 Jan 2022",
      "6 Jan 2022",
      "9 Jan 2022",
    ],
  },
  series: [
    {
      name: "Outage Time (mins)",
      type: "column",
      data: [69, 20, 40, 70, 39, 40, 20],
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

  return (
    <div className="">
      <div className="max-w-[1300px] m-auto">
        <div className="pt-10 px-8">
          <span className="text-2xl sm:text-5xl leading-none tracking-tight font-semibold text-gray-200">
            Last <span className="text-cyan-500">7</span> Outages
          </span>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      </div>
    </div>
  );
}

export default LastSevenChart;
