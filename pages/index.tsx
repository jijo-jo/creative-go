import React from "react";
import HeroSection from "@/components/Header";
import Navbar from "@/components/Navbar";
import ImageEditorPage from "@/components/Editor";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create-Go</title>
        <meta
          name="description"
          content="Create-Go: Your AI-powered image editor for seamless image generation and editing."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon (1).ico" />
      </Head>
      <div className="bg-black min-h-screen">
        <Navbar />
        <main className="flex flex-col items-center justify-center">
          <HeroSection />

          <ImageEditorPage />
        </main>
      </div>
    </>
  );
}
