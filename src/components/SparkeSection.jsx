import React from "react";
import { SparklesCore } from "./ui/Sparkels";

export function SparklesPreview() {
  return (
    (<div
      className="h-fit mt-24 mb-24 w-full dark:bg-black bg-white flex p-2 flex-col items-center justify-center overflow-hidden rounded-md">
      <h1
        className="md:text-7xl text-3xl font-bold text-center dark:text-white text-pink-700 relative z-20">
        Time is a canvas, and each moment is a stroke of your masterpiece.
      </h1>
      <div className="w-[40rem] mt-2 h-40 relative p-2">
        <div
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-px w-3/4" />
        <div
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={1.4}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#000" />

        <div
          className="absolute inset-0 w-full h-full dark:bg-black bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>)
  );
}
