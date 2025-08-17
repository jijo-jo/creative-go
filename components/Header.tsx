"use client";
import React from "react";
import Image from "next/image";
import Button from "./Button";
import desertimage from "../public/desertimage.avif";
import forestImage from "../public/foresttest.webp";
import seaimage from "../public/seaimage.webp";
import mountainimage from "../public/mountaintext.jpg";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden px-4 md:px-8 py-16 flex items-center justify-center">
      <div className="absolute inset-0 bg-radial-gradient"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
            Add Life <br />
            To Image <br />
            <span className="text-[#1d7eec] flex items-center">
              → With Text
            </span>
          </h1>

          <div className="mt-6">
            <a href="#editor">
              <Button
                title="Get started"
                onClick={() => void 0}
                className="bg-[#1d7eec] text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="relative col-span-2 row-span-1 rounded-xl overflow-hidden group h-64">
            <Image
              src={forestImage}
              alt="Forest"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative col-span-1 row-span-1 rounded-xl overflow-hidden group">
            <Image
              src={desertimage}
              alt="Cove"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative col-span-1 row-span-1 rounded-xl overflow-hidden group">
            <Image
              src={mountainimage}
              alt="Architecture"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative col-span-2 row-span-1 rounded-xl overflow-hidden group">
            <Image
              src={seaimage}
              alt="Clouds"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
