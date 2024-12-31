import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navigation({
  links = ["Products", "Orders", "Contact"],
  ...props
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [filteredLinks, setFilteredLinks] = useState(links);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsVerified(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    // Filter links
    setFilteredLinks(
      links.filter((link) => link.toLowerCase().includes(query))
    );

    // Filter products
    setFilteredProducts(
      products.filter((product) =>
        product.attributes.name.toLowerCase().includes(query)
      )
    );
  };

  useEffect(() => {
    // Check if user is verified
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsVerified(true);
    }

    // Fetch products from the API
    fetch("https://times-store-production.up.railway.app/api/products")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setProducts(data.data); // Set products
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <header className="h-24 dark:bg-gray-800 sm:h-32 flex items-center z-30 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="uppercase text-gray-800 dark:text-white font-black sm:text-3xl text-2xl"
        >
          Times
        </Link>
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="relative hidden lg:flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 border border-gray-300 rounded-md mr-4"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 && (
                <ul className="product-list border border-gray-300 w-full">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="product-item py-2 px-4 hover:bg-gray-100"
                    >
                      <Link to={`/products/${product.id}`} className="block">
                        {product.attributes.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {filteredLinks.length > 0 && searchTerm !== "" && (
                <ul className="product-list border border-gray-300 w-full">
                  {filteredLinks.map((link) => (
                    <li key={link} className="py-2 px-4 hover:bg-gray-100">
                      <Link to={`/${link.toLowerCase()}`} className="block">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
            {filteredLinks.map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="py-2 px-4 flex"
              >
                {link}
              </Link>
            ))}
            {isVerified && (
              <>
                <Link
                  to="profile"
                  className="pl-2 pr-2 py-1.5 text-sm hover:bg-pink-600 hover:transition-all rounded-md bg-pink-500 text-white"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="pl-2 ml-2 mr-1 pr-2 py-2 text-sm hover:bg-black hover:transition-all rounded-md bg-[#1a1919] text-white"
                >
                  Logout
                </button>
              </>
            )}
            {!isVerified && (
              <>
                <Link
                  to="login"
                  className="pl-2 pr-2 py-1.5 text-sm hover:bg-pink-600 hover:transition-all rounded-md bg-pink-500 text-white"
                >
                  Login
                </Link>
                <Link
                  to="register"
                  className="pl-2 ml-2 mr-1 pr-2 py-2 text-sm hover:bg-black hover:transition-all rounded-md bg-[#1a1919] text-white"
                >
                  Register
                </Link>
              </>
            )}
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
    </header>
  );
}

export default Navigation;
