import React from "react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";

const Home = () => {
  const slides = [banner1, banner2, banner3];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((item, index) => (
          <img
            src={item}
            key={index}
            className="top-0 absolute left-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}
        <Button></Button>
      </div>
    </div>
  );
};

export default Home;
