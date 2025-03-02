import React from "react";
import Image from "next/image";

const MarketSelection: React.FC<{
  onMarketSelect: (market: string) => void;
}> = ({ onMarketSelect }) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl text-black">Choose your brand</h1>
      <div className="flex flex-col gap-8 justify-center items-center">
        {/* Brand Boxes */}
        <div className="border-2 border-gray-300 rounded-lg pt-4 pb-8 px-12 flex flex-col items-center gap-4">
          <h2 className="text-2xl text-black">Cars</h2>
          {/* Add images for each brand here */}
          <div className="flex flex-row gap-8">
            <Image src="/car1.png" alt="Car Brand 1" width={120} height={120} className="rounded-full"/>
            <Image src="/car2.png" alt="Car Brand 2" width={120} height={120} className="rounded-full" />
            <Image src="/car3.png" alt="Car Brand 3" width={120} height={120} className="rounded-full" />
          </div>
        </div>
        <div className="border-2 border-gray-300 rounded-lg pt-4 pb-8 px-12 flex flex-col items-center gap-4">
          <h2 className="text-2xl text-black">Laptops</h2>
          {/* Add images for each brand here */}
          <div className="flex flex-row gap-8">
            <Image src="/laptop1.png" alt="Laptop Brand 1" width={120} height={120} className="rounded-full" />
            <Image src="/laptop2.png" alt="Laptop Brand 2" width={120} height={120} className="rounded-full" />
            <Image src="/laptop3.png" alt="Laptop Brand 3" width={120} height={120} className="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSelection;
