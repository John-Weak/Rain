import { useEffect, useState } from "react";
import { getDropAndBackDrop } from "../utils/rain";
import Header from "./header";
import Footer from "./footer";

function Layout({ children }: { children: React.ReactNode }) {
  let { drop, backDrop } = getDropAndBackDrop();
  const [drops, setDrops] = useState("");
  const [backDrops, setBackDrops] = useState("");

  useEffect(() => {
    setDrops(drop);
    setBackDrops(backDrop);
  }, []);

  function toggleRain() {
    if (!drops) {
      setDrops(drop);
      setBackDrops(backDrop);
    } else {
      setDrops("");
      setBackDrops("");
    }
  }
  return (
    <div className="">
      <div className="rain front-row">
        <div dangerouslySetInnerHTML={{ __html: drops }}></div>
      </div>
      <div className="rain back-row">
        <div dangerouslySetInnerHTML={{ __html: backDrops }}></div>
      </div>

      <div className="toggles w-full h-full">
        <Header />
        <div className="flex flex-col justify-between min-h-screen overflow-y-auto">
          {/* <button className="bg-red-500 p-2" onClick={toggleRain}>
            Toggle
          </button> */}
          <div className="px-2 sm:px-4 xl:px-20">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
