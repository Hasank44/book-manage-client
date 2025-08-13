import React, { createContext, useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export const BooksContext = createContext();

const BookContext = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetch all books
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get('https://book-manage-server.vercel.app/books')
      .then((response) => {
        setAllBooks(response.data.books);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error fetching books:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // Fetch single book details
  const bookDetails = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://book-manage-server.vercel.app/books/${bookId}`);
      setCurrentBook(response.data.finded);
      return response.data.finded;
    } catch (error) {
      setError(error.message);
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Delete a book
  const deleteBook = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`https://book-manage-server.vercel.app/books/${bookId}`);
      setAllBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      setError(error.message);
      console.error('Error deleting book:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const booksInfo = useMemo(
    () => ({
      allBooks,
      loading,
      error,
      bookDetails,
      currentBook,
      deleteBook,
    }),
    [allBooks, loading, error, bookDetails, currentBook, deleteBook]
  );

  return (
    <BooksContext.Provider value={booksInfo}>
      {children}
    </BooksContext.Provider>
  );
};

export default BookContext;
