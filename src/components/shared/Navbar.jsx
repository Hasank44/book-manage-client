import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

const location = useLocation();
const [ activeLink, setActiveLink] = useState();
useEffect(()=>{
  setActiveLink(location.pathname || '/')
},[location.pathname])

const handleActiveLink = (path) =>{
  setActiveLink(path)
}
  

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/add-book', label: 'Add Book' },
  ];

  return (
    <nav className="w-full h-auto bg-gray-200 font-serif sticky z-10 top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 sm:h-12">
        <Link to={'/'} className="text-xl sm:text-2xl font-bold">
          Book<span className="text-amber-500">Shop</span>
        </Link>
        {/* Desktop Menu */}
        <ul
          className="hidden sm:flex flex-row gap-6"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
              onClick={()=>handleActiveLink(`${link.to}`)}
                to={link.to}
                className={`${activeLink === `${link.to}` ? ' text-amber-500':'text-gray-800'} transition-colors`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Cart and Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to={'/shop'}
            className="text-2xl text-gray-800 hover:text-amber-500 transition-colors"
            aria-label="View shopping cart"
          >
            <FaShoppingCart />
          </Link>
          <button
            className="sm:hidden text-2xl text-gray-800 hover:text-amber-500 transition-colors"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`sm:hidden bg-gray-200 w-full absolute left-0 top-12 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul
          className="flex flex-col gap-3 py-3 px-4"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-gray-800 mx-auto w-full hover:text-amber-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;