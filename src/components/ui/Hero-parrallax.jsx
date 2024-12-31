import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";  
import { TextGenerateEffect } from "./Text-generate-effect";
export const Header = () => {
    return (
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-boldtext-white">
         <TextGenerateEffect words={'ZENTIME'} duration={0.5} className={'text-2xl md:text-7xl font-boldtext-white'}/><br /><TextGenerateEffect className={'text-2xl md:text-7xl font-boldtext-white'} words={'WATCHES'}/> 
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200">
        <TextGenerateEffect words={'Where timeless craftsmanship meets modern design.Our collection is curated to help you make a statement with your timepiece. Explore our selection of carefully crafted watches, each one designed to bring precision and style to your wrist.'} className={'max-w-2xl text-base md:text-xl mt-8 text-neutral-200'} duration={1}/>
        </p>
      </div>
    );
  };
  

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div ref={ref} className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.id} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.id} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.id} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.id}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link to={`/product`} className="block group-hover/product:shadow-2xl">
        <img
          src={product.image?.url || product.thumbnail} 
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
