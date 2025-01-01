import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../pages/Darkmode';

function Navigation({ links = ['Products', 'Orders', 'Contact'], ...props }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsVerified(false);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsVerified(true);
    }
  }, []);

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      className="py-2 px-4 text-white hover:bg-pink-500"
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <header className="h-24 bg-black sm:h-32 flex items-center z-30 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="uppercase light:text-gray-800 text-white font-black sm:text-3xl text-2xl"
        >
          <span className="uppercase text-pink-500 font-black sm:text-3xl text-2xl">ZEN</span>TIME
        </Link>
        <div className="flex items-center">
          <nav className="font-sen text-white uppercase text-lg lg:flex items-center hidden">
            <NavLink to="/">Home</NavLink>
            <div
              className="relative"
              onClick={()=>setDropdownOpen((prev)=>!prev)}
            >
              <button className="py-2 px-4 uppercase text-lg flex">Product</button>
              {dropdownOpen && (
                <div className="absolute left-0 w-40 mt-2 flex flex-col bg-black text-white shadow-lg z-50">
                  <NavLink to="/product/men">Men's</NavLink>
                  <NavLink to="/product/women">Women's</NavLink>
                </div>
              )}
            </div>
            <NavLink to="/contact">Contact</NavLink>
            {isVerified && (
              <>
                <NavLink to="profile">My Profile</NavLink>
                <NavLink to="canceledorders">Canceled</NavLink>
                <button
                  onClick={handleLogout}
                  className="pl-2 ml-2 mr-1 pr-2 py-2 uppercase font-sen text-lg hover:bg-white hover:text-black hover:transition-all rounded-md bg-transparent text-white"
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
      <div
        className={`fixed top-0 left-0 h-full bg-black text-white w-3/4 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-400">
          <h2 className="text-lg font-bold">
            <span className="text-lg font-bold text-pink-500">Zen</span>time
          </h2>
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            ✖
          </button>
        </div>
        <nav className="flex flex-col items-start mt-4 space-y-4 p-4 w-full">
          <NavLink to="/" onClick={toggleMobileMenu} className="w-full py-2 px-4 text-white bg-pink-500 rounded-md">
            Home
          </NavLink>
          <div className="flex flex-col space-y-2">
            <NavLink to="/product/men" onClick={toggleMobileMenu} className="w-full py-2 px-4 text-white bg-pink-500 rounded-md">
              Men's
            </NavLink>
            <NavLink to="/product/women" onClick={toggleMobileMenu} className="w-full py-2 px-4 text-white bg-pink-500 rounded-md">
              Women's
            </NavLink>
          </div>
          <NavLink to="/contact" onClick={toggleMobileMenu} className="w-full py-2 px-4 text-gray-300 hover:border hover:border-pink-500 rounded-md">
            Contact
          </NavLink>
          {isVerified ? (
            <>
              <NavLink to="profile" onClick={toggleMobileMenu} className="w-full py-2 px-4 text-white bg-pink-500 rounded-md">
                Profile
              </NavLink>
              <NavLink to="canceledorders" onClick={toggleMobileMenu} className="w-full py-2 px-4 dark:text-gray-300 bg-transparent border-2 border-pink-500 hover:bg-pink-500 rounded-md">
                Canceled
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="w-full py-2 px-4 dark:text-gray-300 uppercase hover:bg-gray-700 border-white bg-transparent border-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="login" onClick={toggleMobileMenu} className="w-full py-2 px-4 text-white bg-pink-500 rounded-md">
                Login
              </NavLink>
              <NavLink to="register" onClick={toggleMobileMenu} className="w-full py-2 px-4 dark:text-gray-300 bg-transparent border-2 border-pink-500 hover:bg-pink-500 rounded-md">
                Register
              </NavLink>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}

export default Navigation;
