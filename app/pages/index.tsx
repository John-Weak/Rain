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

console.log(new Date("2022-07-30T06:17:27.964Z"));

const Home: NextPage = () => {
  //const { isError, isLoading, statDump } = useStatDump();
  /*  const [useData, setData] = useState<test>();

  useEffect(() => {
    if (!statDump) return;

    let data: test = {
      datasets: {
        data: statDump.map((val) => {
          return { x: val.Start, y: val.Total };
        }),
      },
    };
    setData(data);
  }, [statDump]);

  if (isLoading) return <div>LOADING</div>;
  if (isError) return <div>ERROR</div>; */
  return (
    <div>
      <h1 className="text-3xl font-bold text-white font-mono">Techie</h1>

      <div className="flex justify-center items-center">
        <div className="w-72 h-72 bg-transparent bg-opacity-[0.2] backdrop-blur-sm rounded  border-white border-2 "></div>
      </div>
      <div className="w-72 h-72 bg-white bg-opacity-[0.01] backdrop-blur-xl rounded drop-shadow-lg shadow-xl"></div>

      <div
        className=" w-72 h-72 bg-transparent bg-opacity-[0.01] backdrop-blur-xl rounded drop-shadow-lg"
        style={{
          boxShadow: "inset 0 0 2px hsl(199, 0%, 0%)",
        }}
      ></div>
    </div>
  );
};

export default Home;
