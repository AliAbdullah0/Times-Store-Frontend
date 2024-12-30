import React from 'react'
import Products from './Products'
import Feature from '../components/Feature'
import Carousel from '../components/Carousel'

function Home() {
  return (
    <main class="dark:bg-gray-800 bg-white relative overflow-x-hidden space-y-5">
  
    <div class="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
        <div class="container mx-auto px-6 flex relative">
            <div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                </span>
                <h1 class="font-bebas-neue uppercase text-5xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                    Get Your
                    <span class="text-5xl sm:text-7xl">
                    Timepiece Now                    
                    </span>
                </h1>
                <p class="text-sm sm:text-base text-gray-700 dark:text-white">
                    Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
                </p>
                <div class="flex mt-8">
                    <a href="/product" class="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white sm:text-md text-sm mr-4 hover:bg-pink-400">
                        Get started
                    </a>
                    <a href="/product" class="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white sm:text-md text-sm">
                        Products
                    </a>
                </div>
                
            </div>
            <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                <img src="https://www.tailwind-kit.com/images/object/10.png" class="max-w-xs md:max-w-sm m-auto hover:-translate-y-2 hover:transition-all"/>
            </div>
        </div>
    </div>
    <div className='w-full flex items-center justify-center overflow-hidden'>
<Carousel/>
</div>
<Feature/>
</main>
  )
}

export default Home
