import { motion } from "framer-motion";
import React from "react";
import ImagesSlider from "./ui/ImageSlider";

export function ImagesSliderDemo() {
  const images = [
    "https://www.watchesofswitzerland.com/medias/wosus-hp-tudor-desktop-jan25.jpg?context=bWFzdGVyfGltYWdlc3w5NjA1NDR8aW1hZ2UvanBlZ3xhRE5oTDJneVl5ODVNekk0TkRrMk16UTFNVEU0TDNkdmMzVnpMV2h3TFhSMVpHOXlMV1JsYzJ0MGIzQXRhbUZ1TWpVdWFuQm58ODIyNmNhZGEzMDY5ZWRhYjI4ZTNiZGQzOWIxYzYwNTE0NjgxMzBhYTk4ZWM0NzE2MTA4MTU2NmRhNmNhYmQxOA&imwidth=1920",
    "https://www.watchesofswitzerland.com/medias/wosus-patek-philippe-desktop-carousel-may-23.jpg?context=bWFzdGVyfHJvb3R8MjIxNjAwfGltYWdlL2pwZWd8YURRNUwyZzBZaTg1TWpJd05URTFOalU1T0RBMkxtcHdad3w5M2U2MGJjZGQ2NDU5YjU3MGNmN2UyMmFiN2NiNmFhZTllMjczYjk1ZGQ1ZGM1NzIzNjMyZDMxN2NkNDU4MWQ3&imwidth=1920",
    "https://www.watchesofswitzerland.com/medias/wosus-grand-seiko-carousel-desktop-dec23.jpg?context=bWFzdGVyfGltYWdlc3wyMzQ5ODh8aW1hZ2UvanBlZ3xhVzFoWjJWekwyZzNaUzlvTjJFdk9USTFNVFV4T0RZM056QXlNaTVxY0djfDk3NmU2ZWEzZWE1MTliZTAwZmQ1ZjlhMDZjNjg3MmExNGRhMjI0MTJiMTg0ODUwODcwMjY2NTAxODM3YTc5MDU&imwidth=1920",
  ];
  return (
    (<ImagesSlider className="h-[40rem]" images={images}>
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
        className="z-50 flex flex-col justify-center items-center">
        <motion.p
          className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div
            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>)
  );
}
