import type { NextPage } from "next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TodayTotal from "../components/todayTotal";
import LastSevenChart from "../components/LastSevenChart";
import GreatestOutage from "../components/greatest";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top' as const,
    // },
    title: {
      display: true,
      text: "Tech",
    },
  },
};
const easterStyle =
  "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)";
console.log("%cEaster Egg", easterStyle);
console.log("https://dmg.johnweak.dev");

const Home: NextPage = () => {
  return (
    <>
      <TodayTotal />
      <LastSevenChart />
      <GreatestOutage />
     {/*  <div className="flex justify-center items-center ">
        <div className="px-2 py-2 sm:py-4 ">
          <span className="text-2xl sm:text-5xl leading-none  font-normal text-gray-200 underline underline-offset-[1rem]">
            Notice
          </span>
        </div>
      </div> */}

      {/*  <div className="flex justify-center items-center my-10">
        <div className="p-6 bg-transparent bg-opacity-[0.2] backdrop-blur-sm rounded  border-white border-2 ">
          <div className="text-base text-left text-slate-200 p-2">
            <div className="text-xl">Work in Progress.</div>
            <div>
              More Stats will be added soon, follow the project on{" "}
              <a
                href="https://twitter.com/TusharBali/status/1548208627478978561"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{" "}
              or{" "}
              <a
                href="https://github.com/John-Weak/Rain"
                className="text-green-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif"
              alt="cat with ⚡"
              layout="fill"
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
