import React, { useState } from "react";
import Image from "next/image";
import Button from "./button";

const MarketSelection: React.FC<{
  onMarketSelect: (market: string) => void;
}> = ({ onMarketSelect }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleImageClick = (brand: string) => {
    setSelectedBrand(brand);
  };

  const handleConfirmSelection = () => {
    if (selectedBrand) {
      onMarketSelect(selectedBrand);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl text-black">Choose your brand</h1>
      <div className="flex flex-col gap-8 justify-center items-center">
        {/* Brand Boxes */}
        <div className="border-2 border-gray-300 rounded-lg pt-4 pb-8 px-12 flex flex-col items-center gap-4">
          <h2 className="text-2xl text-black">Cars</h2>
          <div className="flex flex-row gap-8">
            <div 
              className={`cursor-pointer transition-transform ${selectedBrand === 'car1' ? 'scale-110 border-4 border-[#e45543] rounded-full' : ''}`}
              onClick={() => handleImageClick('car1')}
            >
              <Image src="/car1.png" alt="Car Brand 1" width={120} height={120} className="rounded-full"/>
            </div>
            <div 
              className={`cursor-pointer transition-transform ${selectedBrand === 'car2' ? 'scale-110 border-4 border-[#e45543] rounded-full' : ''}`}
              onClick={() => handleImageClick('car2')}
            >
              <Image src="/car2.png" alt="Car Brand 2" width={120} height={120} className="rounded-full"/>
            </div>
            <div 
              className={`cursor-pointer transition-transform ${selectedBrand === 'car3' ? 'scale-110 border-4 border-[#e45543] rounded-full' : ''}`}
              onClick={() => handleImageClick('car3')}
            >
              <Image src="/car3.png" alt="Car Brand 3" width={120} height={120} className="rounded-full"/>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-300 rounded-lg pt-4 pb-8 px-12 flex flex-col items-center gap-4">
          <h2 className="text-2xl text-black">Laptops</h2>
          <div className="flex flex-row gap-8">
            <div 
              className={`cursor-pointer transition-transform ${selectedBrand === 'laptop1' ? 'scale-110 border-4 border-[#e45543] rounded-full' : ''}`}
              onClick={() => handleImageClick('laptop1')}
            >
              <Image src="/laptop1.png" alt="Laptop Brand 1" width={120} height={120} className="rounded-full"/>
            </div>
            <div 
              className={`cursor-pointer transition-transform ${selectedBrand === 'laptop2' ? 'scale-110 border-4 border-[#e45543] rounded-full' : ''}`}
              onClick={() => handleImageClick('laptop2')}
            >
              <Image src="/laptop2.png" alt="Laptop Brand 2" width={120} height={120} className="rounded-full"/>
            </div>
            <div 
              className={`cursor-pointer transition-transform ${selectedBrand === 'laptop3' ? 'scale-110 border-4 border-[#e45543] rounded-full' : ''}`}
              onClick={() => handleImageClick('laptop3')}
            >
              <Image src="/laptop3.png" alt="Laptop Brand 3" width={120} height={120} className="rounded-full"/>
            </div>
          </div>
        </div>
      </div>
      
      {selectedBrand && (
        <Button 
          label="Select Brand" 
          onClick={handleConfirmSelection}
        />
      )}
    </div>
  );
};

export default MarketSelection;
