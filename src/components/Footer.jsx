import React from 'react';
import { Link } from 'react-router';

function Footer({
  links = ['Facebook', 'X', 'Instagram'],
  ...props
}) {
  return (
    <footer className="bg-black w-full py-8">
      <div className="max-w-screen-xl px-4 mx-auto">
        <ul className="flex flex-wrap justify-between max-w-screen-md mx-auto text-lg font-light">
          {links.map((link) => (
            <Link to={link.toLowerCase()} key={link}>
              <li className="text-gray-200 hover:text-white transition-colors duration-200">
                {link}
              </li>
            </Link>
          ))}
        </ul>
        <div className="pt-8 flex max-w-xs mx-auto items-center justify-between">
          <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.63 8.84 8.29 9.74v-6.9h-2.5v-2.84h2.5v-2.16c0-2.47 1.48-3.83 3.74-3.83 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.56v1.77h2.77l-.44 2.84h-2.33v6.9C18.37 20.84 22 16.84 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M24 4.56c-.88.39-1.82.66-2.82.78a4.92 4.92 0 002.16-2.72 9.86 9.86 0 01-3.1 1.19 4.92 4.92 0 00-8.38 4.48 13.95 13.95 0 01-10.11-5.13 4.92 4.92 0 001.52 6.56 4.92 4.92 0 01-2.22-.61v.06a4.92 4.92 0 003.94 4.83 4.92 4.92 0 01-2.2.08 4.92 4.92 0 004.59 3.42 9.86 9.86 0 01-6.1 2.1c-.39 0-.77-.02-1.15-.07a13.95 13.95 0 007.55 2.22c9.05 0 14-7.5 14-14v-.64c.96-.7 1.8-1.56 2.46-2.54z" />
            </svg>
          </a>
          <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M19.64 4.64a3.63 3.63 0 00-5.12 0l-1.36 1.36-1.36-1.36a3.63 3.63 0 10-5.12 5.12L7.64 11l-1.36 1.36a3.63 3.63 0 105.12 5.12L11 16.36l1.36 1.36a3.63 3.63 0 105.12-5.12L16.36 11l1.36-1.36a3.63 3.63 0 000-5.12z" />
            </svg>
          </a>
          <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2a10 10 0 00-6.93 17.07l.7-.7a8.48 8.48 0 11.82-.82l-.7.7A10 10 0 1012 2zm1.06 10.94l4.19-4.19a1.25 1.25 0 00-1.76-1.76l-4.19 4.19-4.19-4.19a1.25 1.25 0 10-1.76 1.76l4.19 4.19-4.19 4.19a1.25 1.25 0 101.76 1.76l4.19-4.19 4.19 4.19a1.25 1.25 0 101.76-1.76l-4.19-4.19z" />
            </svg>
          </a>
        </div>
        <div className="text-center text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
          Created by Ali
        </div>
      </div>
    </footer>
  );
}

export default Footer;
