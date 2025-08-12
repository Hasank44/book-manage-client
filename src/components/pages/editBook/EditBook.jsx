import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { BooksContext } from '../../../Contaxt/BookContaxt';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBook, bookDetails, updateBook } = useContext(BooksContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    bookDetails(id)
      .then(() => setIsLoading(false))
      .catch(() => {
        setError('Failed to load book details');
        setIsLoading(false);
      });
  }, [id, bookDetails]);

  useEffect(() => {
    if (currentBook) {
      setValue('title', currentBook.title);
      setValue('author', currentBook.author);
      setValue('publishedYear', currentBook.publishedYear);
      setValue('genre', currentBook.genre);
      setValue('price', currentBook.price);
      setValue('description', currentBook.description);
      setValue('imageUrl', currentBook.imageUrl);
    }
  }, [currentBook, setValue]);

  const onSubmit = async (data) => {
    const price = parseFloat(data.price);
    if (isNaN(price)) {
      toast.error('Price must be a valid number');
      return;
    }
    data.price = price;
    setIsSubmitting(true);
    try {
      await axios.put(`https://book-manage-ruby.vercel.app/books/${id}`, data);
      toast.success('Book updated successfully');
      updateBook({ ...data, id });
      navigate(`/books/${id}`);
    } catch (err) {
      toast.error(`Error updating book: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading book details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required', minLength: { value: 2, message: 'Title must be at least 2 characters' } })}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            aria-invalid={errors.title ? 'true' : 'false'}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && <p id="title-error" className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="author" className="block text-gray-700">Author</label>
          <input
            id="author"
            type="text"
            {...register('author', { required: 'Author is required' })}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            aria-invalid={errors.author ? 'true' : 'false'}
            aria-describedby={errors.author ? 'author-error' : undefined}
          />
          {errors.author && <p id="author-error" className="text-red-500 text-sm">{errors.author.message}</p>}
        </div>
        <div>
          <label htmlFor="publishedYear" className="block text-gray-700">Published Year</label>
          <input
            id="publishedYear"
            type="number"
            {...register('publishedYear', {
              required: 'Published year is required',
              min: { value: 1800, message: 'Year must be after 1800' },
              max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' },
            })}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            aria-invalid={errors.publishedYear ? 'true' : 'false'}
            aria-describedby={errors.publishedYear ? 'publishedYear-error' : undefined}
          />
          {errors.publishedYear && <p id="publishedYear-error" className="text-red-500 text-sm">{errors.publishedYear.message}</p>}
        </div>
        <div>
          <label htmlFor="genre" className="block text-gray-700">Genre</label>
          <input
            id="genre"
            type="text"
            {...register('genre', { required: 'Genre is required' })}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            aria-invalid={errors.genre ? 'true' : 'false'}
            aria-describedby={errors.genre ? 'genre-error' : undefined}
          />
          {errors.genre && <p id="genre-error" className="text-red-500 text-sm">{errors.genre.message}</p>}
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price cannot be negative' },
            })}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            aria-invalid={errors.price ? 'true' : 'false'}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />
          {errors.price && <p id="price-error" className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && <p id="description-error" className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-gray-700">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            {...register('imageUrl', {
              required: 'Image URL is required',
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message: 'Please enter a valid image URL',
              },
            })}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            aria-invalid={errors.imageUrl ? 'true' : 'false'}
            aria-describedby={errors.imageUrl ? 'imageUrl-error' : undefined}
          />
          {errors.imageUrl && <p id="imageUrl-error" className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;