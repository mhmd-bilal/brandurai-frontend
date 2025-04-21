"use client";
import React from "react";
import Loader from "./components/Loader"; // Import Loader component
import MainScreen from "./components/MainScreen"; // Import MainScreen component
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  // Simulate loading time
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative min-h-screen gap-16 py-7 px-8 overflow-y-hidden font-[family-name:var(--font-jersey-15)]">
        <div className="absolute inset-0 bg-[url('/bg2.gif')] bg-cover bg-center filter blur-xs z-0"></div>
        <div className="relative z-10 bg-white/0 opacity-95 flex flex-col justify-center items-center rounded-xl min-h-[920px] border-0 border-[#75221c]">
          {loading ? <Loader /> : <MainScreen />}
        </div>
      </div>{" "}
    </DndProvider>
  );
}
