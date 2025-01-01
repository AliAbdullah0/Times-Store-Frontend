import React from 'react';

function Footer({ 
  links = ['Facebook', 'Twitter', 'Instagram'], 
  columns = [
    { title: 'Components', items: ['Buttons', 'Cards', 'Modals', 'Forms'] },
    { title: 'Contacts', items: ['Email', 'Phone', 'Address', 'Support'] },
    { title: 'Customization', items: ['Themes', 'Plugins', 'Settings', 'API'] },
  ] 
}) {
  return (
    <footer className="bg-black dark:bg-black pt-4 pb-8 xl:pt-8">
      <div className="max-w-screen-lg px-4 mx-auto text-gray-400 xl:max-w-screen-xl sm:px-6 md:px-8 dark:text-gray-300">
        <ul className="flex flex-wrap justify-center pb-8 text-lg font-light">
          {columns.map((section, index) => (
            <li key={index} className="w-1/2 md:w-1/3 lg:w-1/3">
              <div className="text-center">
                <h2 className="text-gray-500 dark:text-gray-200 text-md uppercase mb-4">{section.title}</h2>
                <ul>
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                    >
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="pt-8 flex border-t border-gray-200 max-w-xs mx-auto items-center justify-between">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={`#${link.toLowerCase()}`} 
              className="transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8 dark:text-gray-400">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
