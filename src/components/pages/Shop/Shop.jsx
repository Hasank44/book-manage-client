import React from 'react'
import { useContext } from 'react'
import { BooksContext } from '../../../Contaxt/BookContaxt'
import { Link } from 'react-router-dom'
const Shop = () => {
  const { allBooks } = useContext(BooksContext);
  return (
    <div className="px-10 py-15 w-full">
        {
          allBooks.length >= 1 ?
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
            >
              <Link  to={`/details/${book._id}`}
               className="w-full h-40 overflow-hidden rounded-md">
                <img
                  src={book.imageUrl}
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
                  <Link  to={`/details/${book._id}`}
                   className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800
                   transition-colors text-sm cursor-pointer ">
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        :
        <div className='text-center text-2xl pt-5 text-gray-600'>
          No Books Found Right now
        </div>
        }
      </div>
  )
}

export default Shop