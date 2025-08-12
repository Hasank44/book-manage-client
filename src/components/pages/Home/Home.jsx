import React from 'react';
import bannerImg from '../../../assets/image/banner.webp'; // Fixed typo in variable name
import Products from '../Product/Products';

const Home = () => {
  return (
    <div>
      <div className="w-full bg-gray-900 h-90 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-4 text-center md:text-left">
        <h1 className="mx-auto text-2xl sm:text-3xl lg:text-4xl text-amber-600">
          Welcome to our Books
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-100">
            - a haven for book lovers
          </p>
        </h1>
        <span className="relative flex justify-center">
          <input
            type="text"
            className="w-full max-w-xs sm:max-w-sm bg-gray-700 px-3 py-2 rounded-md border border-gray-700 text-gray-300 text-sm sm:text-base"
            required
            placeholder="Enter Title"
          />
          {/* <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300" /> */}
          <p className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-md cursor-pointer bg-amber-600 px-3 py-2 text-sm sm:text-base text-white">
            Search
          </p>
        </span>
      </div>
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
        <img
          src={bannerImg}
          className="w-[90%] mx-auto sm:w-[80%] h-[80%]  rounded-md object-cover"
          alt="Book banner image"
        />
      </div>
    </div>
    <Products />
    </div>
  );
};

export default Home;