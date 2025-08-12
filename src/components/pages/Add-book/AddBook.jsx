import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const price = parseFloat(data.price);
    if (isNaN(price)) {
      toast.error('Price must be a valid number');
      return;
    }
    console.log(data)
    data.price = price;
    axios.post(`https://book-manage-ruby.vercel.app/books`, data)
      .then(() => {
        toast.success('Book added successfully');
        reset();
      })
      .catch((err) => {
        toast.error(`Error adding book: ${err.message}`);
      });
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Add Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 max-w-5xl">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            {...register('title')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            {...register('author')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Published Year</label>
          <input
            type="number"
            {...register('publishedYear')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            {...register('genre')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register('description')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            {...register('imageUrl')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Book URL</label>
          <input
            type="text"
            {...register('bookUrl')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;