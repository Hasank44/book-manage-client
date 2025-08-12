import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useParams, Link } from 'react-router'
import { BooksContext } from '../../../Contaxt/BookContaxt'
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify'


const Details = () => {
const { id } = useParams()
const { currentBook, bookDetails, loading } = useContext(BooksContext)

const addToCart = () =>{
  toast.error('This Feature Not Available Right Now')
}

useEffect(()=>{
  bookDetails(id)
}, [ bookDetails, id])

  return (
     <div className='py-3'>
      <ToastContainer className={'pt-8'} />
      {
        loading ? <div className='text-center text-gray-400 text-2xl'><h1>Loding</h1></div> 
        : <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-600 hover:text-amber-500 mb-8 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Books
      </Link>

      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={currentBook.imageUrl || '/placeholder-book.jpg'}
              alt={currentBook.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title and Author */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentBook.title}</h1>
            <p className="text-xl text-gray-600">by {currentBook.author}</p>
          </div>

          {/* Price and Genre */}
          <div className="space-y-2">
            <p className="text-2xl font-bold text-amber-500">
              ${currentBook.price} USD
            </p>
            <p className="text-gray-600">
              Genre: <span className="text-gray-900">{currentBook.genre}</span>
            </p>
            {currentBook.publishedYear && (
              <p className="text-gray-600">
                Published: <span className="text-gray-900">{currentBook.publishedYear}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {currentBook.description || 'No description available.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <button onClick={addToCart}
             className=" bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center">
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <Link
              to={`/edit/${currentBook._id}`}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit Book
            </Link>
          </div>

          {/* Additional Details */}
          {currentBook.isbn && (
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Additional Information</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">ISBN</p>
                  <p className="text-gray-900">{currentBook.isbn}</p>
                </div>
                <div>
                  <p className="text-gray-600">Pages</p>
                  <p className="text-gray-900">{currentBook.pages || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Language</p>
                  <p className="text-gray-900">{currentBook.language || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Format</p>
                  <p className="text-gray-900">{currentBook.format || 'Paperback'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      }
     </div>
  )
}

export default Details