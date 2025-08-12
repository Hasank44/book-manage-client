// src/components/pages/Product/Products.jsx
import React, { useContext, useState } from 'react';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { BooksContext } from '../../../Contaxt/BookContaxt';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const { allBooks, loading, deleteBook } = useContext(BooksContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All Books');
  const [searchQuery, setSearchQuery] = useState('');
  const booksPerPage = 8;
  const navigate = useNavigate();

  // Filter books based on selected category and search query
  const filteredBooks = allBooks.filter(
    (book) =>
      (selectedCategory === 'All Books' || book.category === selectedCategory) &&
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery('');
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle delete book
  const handleDeleteBook = async (bookId) => {
    if (bookId) {
      try {
        await deleteBook(bookId);
        toast.success('Book deleted successfully');
        setTimeout(() => {
            navigate('/');
        }, [5000]);
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Failed to delete book. Please try again.');
      }
    }
  };

  return (
    <div className="w-full h-auto bg-gray-200 px-5 sm:px-10 py-5">
      <ToastContainer />
      <div className="pt-5">
        {/* Search Input */}
        <div className="w-[80%] mx-auto lg:w-[55%] mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search books by title..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            aria-label="Search books by title"
          />
        </div>

        {/* Category Navigation */}
        <ul
          className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 text-sm text-gray-800 w-[80%] mx-auto lg:w-[55%]"
          role="navigation"
          aria-label="Book categories"
        >
          {['All Books', 'Fiction', 'Adventure', 'Romance', 'Dystopian', 'Historical', 'Non-Fiction'].map(
            (category) => (
              <li
                key={category}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? 'text-amber-600 font-semibold'
                    : 'text-gray-800 hover:text-amber-600'
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="px-5 sm:px-10 md:px-3 py-12 w-full">
        {loading ? (
          <div className="col-span-full text-center py-10">
            <h1 className="text-gray-600 text-lg">Loading...</h1>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
                  >
                    <Link to={`/details/${book._id}`} className="w-full h-40 overflow-hidden rounded-md">
                      <img
                        src={book.imageUrl || 'https://via.placeholder.com/150'} // Fallback image
                        alt={book.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </Link>
                    <div className="mt-4 flex-1">
                      <h1 className="text-lg font-semibold text-gray-800 line-clamp-2">{book.title}</h1>
                      <h3 className="text-sm text-gray-600 mt-1">{book.author}</h3>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-amber-600">${book.price}</p>
                      <div className="flex gap-2">
                        <Link
                          to={`/edit/${book._id}`}
                          className="px-3 py-1 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="px-3 cursor-pointer py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                          aria-label={`Delete book ${book.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-600 text-lg">
                    {searchQuery ? 'No books found matching your search.' : 'No books found in this category.'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md text-sm flex items-center justify-center ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  } transition-colors`}
                  aria-label="Previous page"
                >
                  <FaLessThan className="w-3 h-3" />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        currentPage === index + 1
                          ? 'bg-amber-600 text-white'
                          : 'bg-white text-gray-800 hover:bg-amber-100'
                      } transition-colors`}
                      aria-label={`Page ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md text-sm flex items-center justify-center ${
                    currentPage === totalPages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  } transition-colors`}
                  aria-label="Next page"
                >
                  <FaGreaterThan className="w-3 h-3" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;