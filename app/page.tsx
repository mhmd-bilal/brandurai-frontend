"use client";
import React from "react";
import Loader from "./components/Loader"; // Import Loader component
import MainScreen from "./components/MainScreen"; // Import MainScreen component

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  // Simulate loading time
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-vt323)]">
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center filter blur-md z-0"></div>
      <div className="relative z-10 bg-white opacity-85 flex flex-col justify-center items-center rounded-xl min-h-[820px] border-4 radi border-[#75221c]">
 
        {loading ? ( 
          <Loader />
        ) : (
          <MainScreen />
        )}
      </div>
    </div>
  );
}
