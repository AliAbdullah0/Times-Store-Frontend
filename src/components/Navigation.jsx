import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation({
  links = ['Products', 'Orders', 'Contact'],
  ...props
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerified,setIsVerified] = useState(false)
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };
  const handleLogout = ()=>{
    localStorage.removeItem('jwt')
    setIsVerified(false)
  }

  useEffect(()=>{
    const jwt = localStorage.getItem('jwt')
    if(jwt){
      setIsVerified(true)
    }
  },[])

  return (
    <header className="h-24 dark:bg-gray-800 sm:h-32 flex items-center z-30 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to='/' className="uppercase text-gray-800 dark:text-white font-black sm:text-3xl text-2xl">
          Times
        </Link>
        <div className="flex items-center">
          <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
            <Link to="/" className="py-2 px-4 flex">
              Home
            </Link>
            <Link to="/product" className="py-2 px-4 flex">
              Product
            </Link>
            <Link to="/contact" className="py-2 px-4 flex">
              Contact
            </Link>
            {
              isVerified && (
                <>
              <Link to="profile" className="pl-2 pr-2 py-1.5 text-sm hover:bg-pink-600 hover:transition-all rounded-md bg-pink-500 text-white">
              My Orders
            </Link>
            <Link to="canceledorders" className="pl-2 pr-2 py-1.5 ml-2 text-sm hover:bg-red-600 hover:transition-all rounded-md bg-red-500 text-white">
              Canceled
            </Link>
             <button onClick={handleLogout} className="pl-2 ml-2 mr-1 pr-2 py-2 text-sm hover:bg-black hover:transition-all rounded-md bg-[#1a1919] text-white">
             Logout
           </button>
           </>
              )
            }
            {
              !isVerified && (
                <>
            <Link to="login" className="pl-2 pr-2 py-1.5 text-sm hover:bg-pink-600 hover:transition-all rounded-md bg-pink-500 text-white">
              Login
            </Link>
            <Link to="register" className="pl-2 ml-2 mr-1 pr-2 py-2 text-sm hover:bg-black hover:transition-all rounded-md bg-[#1a1919] text-white">
            Register
          </Link>
          </>
            )
            }
          </nav>
          <button
            className="lg:hidden flex flex-col ml-4"
            onClick={toggleMobileMenu}
          >
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
          </button>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-24 w-full dark:bg-gray-800 dark:text-white text-gray-800 shadow-md z-40">
          <nav className="flex flex-col items-center py-4 p-2 gap-2 dark:bg-gray-900 bg-white shadow-md">
            <Link to="/" className="py-2 px-4 w-full text-white bg-pink-500 rounded-md p-2">
              Home
            </Link>
            <Link to="/product" className="py-2 px-4 w-full dark:bg-gray-900 bg-gray-200 rounded p-2">
              Product
            </Link>
            <Link to="/contact" className="py-2 px-4 w-full dark:bg-gray-900 bg-gray-200 rounded p-2">
              Contact
            </Link>
            {
              isVerified && (
                <>
            <Link to="canceledorders" className="pl-2 pr-2 py-1.5 w-full text-sm hover:bg-red-600 hover:transition-all rounded-md bg-red-500 text-white">
              Canceled
            </Link>
              <Link to="profile" className="pl-2 pr-2 py-1.5 w-full text-sm hover:bg-pink-600 hover:transition-all rounded-md bg-pink-500 text-white">
              My Orders
            </Link>
             <button onClick={handleLogout} className="pl-2 pr-2 w-full py-2 text-sm hover:bg-black hover:transition-all rounded-md bg-[#1a1919] text-white">
             Logout
           </button>
           </>
              )
            }
            {
              !isVerified && (
                <>
            <Link to="login" className="pl-2 pr-2 py-1.5 w-full text-sm hover:bg-pink-600 hover:transition-all rounded-md bg-pink-500 text-white">
              Login
            </Link>
            <Link to="register" className="pl-2 w-full pr-2 py-2 text-sm hover:bg-black hover:transition-all rounded-md bg-[#1a1919] text-white">
            Register
          </Link>
          </>
            )
            }
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navigation;
