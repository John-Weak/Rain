import { useEffect, useState } from "react";
import { getDropAndBackDrop } from "../utils/rain";
import Header from "./header";

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
        <div className="w-full h-full overflow-y-auto">
          <Header></Header>
          <button className="bg-red-500 p-2" onClick={toggleRain}>
            Toggle
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
