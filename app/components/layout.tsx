import { useEffect, useState } from "react";
import { getDropAndBackDrop } from "../utils/rain";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  const [drops, setDrops] = useState("");
  const [backDrops, setBackDrops] = useState("");

  useEffect(() => {
    const { drop, backDrop } = getDropAndBackDrop();
    setDrops(drop);
    setBackDrops(backDrop);
  }, []);

  // function toggleRain() {
  //   if (!drops) {
  //     setDrops(drop);
  //     setBackDrops(backDrop);
  //   } else {
  //     setDrops("");
  //     setBackDrops("");
  //   }
  // }
  return (
    <>
      <Head>
        <title>Rain</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="Rain" />
        <meta name="application-name" content="Rain" />
        <meta name="msapplication-TileColor" content="#121212" />
        <meta name="theme-color" content="#121212" />
      </Head>
      <div className="rain front-row">
        <div dangerouslySetInnerHTML={{ __html: drops }}></div>
      </div>
      <div className="rain back-row">
        <div dangerouslySetInnerHTML={{ __html: backDrops }}></div>
      </div>

      <div className="toggles w-full h-full">
        <div className="relative">
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
    </>
  );
}

export default Layout;
