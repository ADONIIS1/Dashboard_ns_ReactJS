import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import Modal from "../components/Modal";





const BlogManager = () => {


  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const blogPosts = [
    {
      title: 'Blog Post 1',
      image: 'https://picsum.photos/300/200',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo vel hendrerit elementum, lacus felis commodo massa, a maximus dolor dui eget lacus.',
    },
    {
      title: 'Blog Post 2',
      image: 'https://picsum.photos/300/200',
      excerpt: 'Nulla malesuada lorem velit, a volutpat enim pretium sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce interdum ultricies orci, sit amet gravida tortor malesuada ac.',
    },
    {
      title: 'Blog Post 3',
      image: 'https://picsum.photos/300/200',
      excerpt: 'Vivamus ullamcorper turpis tellus, eget lobortis magna mattis id. Praesent non est non purus dapibus maximus. Curabitur pellentesque luctus arcu euismod bibendum. Vivamus vel purus vel est convallis viverra.',
    },
  ];

  const handleEdit = (e) => {

  };

  const handleDelete = (e) => {

  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Blog Posts</h1>
      <div className="mt-8 flex justify-end">
        <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
          +
        </button>
      </div>
      <div style={{paddingTop : '20px'}} className="w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Excerpt</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2"><img src={post.image} alt={post.title} className="w-24 h-auto" /></td>
                <td className="border px-4 py-2">{`${post.excerpt.substring(0, 50)}...`}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800"><HiPencilAlt size={20} /></button>
                    <button className="text-red-600 hover:text-red-800"><HiTrash size={20} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="My Modal">
      <button
        className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline"
        onClick={closeModal}
      >
        <svg
          className="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18.293 3.293a1 1 0 00-1.414 0L10 8.586 4.707 3.293a1 1 0 10-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 001.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.879-5.879a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

          <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Tiêu đề
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Nội dung
        </label>
        <textarea
          id="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Ảnh
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Lưu
      </button>
      </Modal>
    </>

    </div>

  );
};

export default BlogManager;


