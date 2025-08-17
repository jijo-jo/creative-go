import React from "react";
import HeroSection from "@/components/Header";
import Navbar from "@/components/Navbar";
import ImageEditorPage from "@/components/Editor";


export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <HeroSection />
        
          <ImageEditorPage />
      </main>
    </div>
  );
}
