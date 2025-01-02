import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ImagesSlider } from "./ui/ImageSlider";

export default function ImagesSliderDemo() {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSliderImages = async () => {
    try {
      const response = await fetch('/path-to-your-api'); // Adjust your API path here
      const result = await response.json();
      setData(result.data);
      setImages(result.data[0].Images.map((image) => image.url)); // Assuming 'Images' is an array
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading images</div>;
  }

  return (
    <ImagesSlider className="h-fit" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p
          className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4"
        >
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
