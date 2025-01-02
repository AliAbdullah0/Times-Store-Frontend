import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import DarkModeToggle from '../pages/Darkmode';
import CartDrawer from './ui/Cart';
import { useProfile } from '../ProfileContext';

function Navigation({ links = ['Products', 'Orders', 'Contact'], ...props }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartDrawerOpen,setCartDrawerOpen] = useState(false)
  const user = useProfile()

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsVerified(false);
  };
  
  useEffect(()=>{
    if(!user){
      localStorage.removeItem('jwt')
      window.location.reload()
      Navigate('/')
    }
  },[user])


  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsVerified(true);
    }
  }, []);

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      className="py-2 px-4 text-current hover:bg-pink-500 hover:text-white dark:hover:bg-white dark:hover:text-black"
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <header>
      <div className='w-full h-5 bg-pink-500 text-white flex items-center justify-center p-4 font-semibold'>
        Winter Sale! 50% Off On All Items!
      </div>
      <div className="h-24 bg-white dark:bg-black sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="uppercase text-gray-800 dark:text-white font-black sm:text-3xl text-2xl"
          >
            <span className="uppercase text-pink-500 font-black sm:text-3xl text-2xl">ZEN</span>TIME
          </Link>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
              <NavLink to="/">Home</NavLink>
              <div
                className="relative"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <button className="py-2 px-4 uppercase text-lg flex">
                  Product
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 w-40 mt-2 flex flex-col bg-gray-100 dark:bg-black text-gray-800 dark:text-white shadow-lg z-50">
                    <NavLink to="/product/men">Men's</NavLink>
                    <Link className='py-2 px-4 text-current hover:bg-pink-500 hover:text-white dark:hover:bg-white dark:hover:text-black' to="/product/women">Women's</Link>
                  </div>
                )}
              </div>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to='/cart'>Cart</NavLink>
              {isVerified && (
                <>
                  <NavLink to="profile">My Profile</NavLink>
                  <NavLink to="canceledorders">Canceled</NavLink>
                  <button
                    onClick={handleLogout}
                    className="pl-2 ml-2 mr-1 pr-2 py-2 uppercase font-sen text-lg hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black hover:transition-all rounded-md bg-transparent"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isVerified && (
                <>
                  <NavLink to="login">Login</NavLink>
                  <NavLink to="register">Register</NavLink>
                </>
              )}
            </nav>
            <button
              className="lg:hidden flex flex-col ml-4"
              onClick={toggleMobileMenu}
            >
              <span className="w-6 h-1 bg-pink-500 mb-1"></span>
              <span className="w-6 h-1 bg-pink-500 mb-1"></span>
              <span className="w-6 h-1 bg-pink-500 mb-1"></span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 dark:bg-black text-gray-800 dark:text-white w-3/4 z-50 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-400">
          <h2 className="text-lg font-bold">
            <span className="text-lg font-bold text-pink-500">Zen</span>time
          </h2>
          <button
            onClick={toggleMobileMenu}
            className="text-current focus:outline-none"
          >
            ✖
          </button>
        </div>
        <nav className="flex flex-col items-start mt-4 space-y-4 p-4 w-full">
          <NavLink to="/" onClick={toggleMobileMenu}>
            Home
          </NavLink>
          <div className="flex flex-col space-y-2">
            <NavLink to="/product/men" onClick={toggleMobileMenu}>
              Men's
            </NavLink>
            <NavLink to="/product/women" onClick={toggleMobileMenu}>
              Women's
            </NavLink>
          </div>
          <NavLink to="/contact" onClick={toggleMobileMenu}>
            Contact
          </NavLink>
          <NavLink to="/cart" onClick={toggleMobileMenu}>
            Cart
          </NavLink>
          {isVerified ? (
            <>
              <NavLink to="profile" onClick={toggleMobileMenu}>
                Profile
              </NavLink>
              <NavLink to="canceledorders" onClick={toggleMobileMenu}>
                Canceled
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="w-full py-2 px-4 uppercase hover:bg-gray-800 dark:hover:bg-white border-gray-800 dark:border-white border-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="login" onClick={toggleMobileMenu}>
                Login
              </NavLink>
              <NavLink to="register" onClick={toggleMobileMenu}>
                Register
              </NavLink>
            </>
          )}
          {/* Dark Mode Toggle in Mobile Drawer */}
          <div className="flex justify-center mt-4">
            <DarkModeToggle isDarkMode={isDarkMode} toggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
