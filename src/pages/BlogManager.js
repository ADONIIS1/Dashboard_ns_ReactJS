import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import blogService from '~/services/blog';
import { ToastContainer, toast } from 'react-toastify';
import DialogBox from '~/components/DialogBox';
import validator from 'validator';

const BlogManager = () => {
    // useState modal
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setFormErrors({});
        setBlog({
            title: '',
            image: '',
            content: '',
        });
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // sort
    const [sorting, setSorting] = useState({ criteria: null, direction: 'asc' });

    const getSortingFunction = (criteria, direction) => {
        const directionModifier = direction === 'asc' ? 1 : -1;
        return (a, b) => {
            if (a[criteria] < b[criteria]) {
                return -1 * directionModifier;
            }
            if (a[criteria] > b[criteria]) {
                return 1 * directionModifier;
            }
            return 0;
        };
    };

    // data
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        blogService
            .getAll({})
            .then((response) => {
                setJsonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEdit = (id, title, image, content) => {
        setFormErrors({});
        if (id !== undefined) {
            setBlog({
                _id: id,
                title: title,
                image: image,
                content: content,
            });
            setIsOpen(true);
        }
    };

    const handleDelete = async (_id) => {
        if (_id !== undefined) {
            try {
                await blogService.delete(_id);
                setJsonData((prevData) => prevData.filter((item) => item._id !== _id));
            } catch (error) {
                toast.error(error, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
            toast.success('🦄 Delete Blog success!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };

    const [blog, setBlog] = useState({
        title: '',
        image: '',
        content: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setBlog((prevState) => ({
            ...prevState,
            [id]: value,
        }));

        const errors = {};
        if (!value && validator.isEmpty(blog.title)) {
            errors.title = 'This field is required';
        }
        if (!value && validator.isEmpty(blog.content)) {
            errors.content = 'This field is required';
        }
        if (!value && validator.isEmpty(blog.image)) {
            errors.image = 'This field is required';
        }
        setFormErrors(errors);
    };

    const handleSubmit = async (event, _id) => {
        event.preventDefault();
        setFormErrors({});
        const errors = {};
        if (validator.isEmpty(blog.title)) {
            errors.title = 'This field is required';
        }
        if (validator.isEmpty(blog.content)) {
            errors.content = 'This field is required';
        }
        if (validator.isEmpty(blog.image)) {
            errors.image = 'This field is required';
        }
        if (Object.keys(errors).length === 0) {
            if (_id === undefined) {
                setBlog(blog);
                await blogService
                    .create(blog)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Add blog sucess!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                setBlog(blog);
                await blogService
                    .update(_id, blog)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Edit blog success!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }
            blogService
                .getAll({})
                .then((response) => {
                    setJsonData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            closeModal();
        } else {
            setFormErrors(errors);
        }
    };

    /// Modal confirm
    const handleCancel = () => {
        console.log('Cancel button clicked');
    };

    // validation
    const [formErrors, setFormErrors] = useState('123');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Blog Posts</h1>
            <div className="mt-8 flex justify-end">
                <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    +
                </button>
            </div>
            <div className="w-full overflow-x-auto" style={{ paddingTop: '20px' }}>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'title', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Title
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'image', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Image
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'content', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Content
                            </th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.sort(getSortingFunction(sorting.criteria, sorting.direction)).map((post, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{post.title}</td>

                                <td className="border px-4 py-2">
                                    <img src={post.image} alt={post.title} className="w-24 h-auto" />
                                </td>
                                <td className="border px-4 py-2">{`${post.content.substring(0, 50)}...`}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiPencilAlt size={20} onClick={() => handleEdit(post._id, post.title, post.image, post.content)} />
                                        </button>

                                        <DialogBox
                                            buttonText={
                                                <span className="text-red-600 cursor-pointer hover:text-red-800">
                                                    <HiTrash size={20} />
                                                </span>
                                            }
                                            headerText="Delete Blog"
                                            bodyText="Are you sure of your action? This action cannot be undone"
                                            cancelText="Cancel"
                                            confirmText="Confirm"
                                            onCancel={handleCancel}
                                            onConfirm={() => handleDelete(post._id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <>
                <Modal isOpen={isOpen} onClose={closeModal} title="Blog">
                    <button
                        className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline"
                        onClick={closeModal}
                    >
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18.293 3.293a1 1 0 00-1.414 0L10 8.586 4.707 3.293a1 1 0 10-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 001.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.879-5.879a1 1 0 000-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <form onSubmit={(event) => handleSubmit(event, blog._id)}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                Tiêu đề
                            </label>
                            <input
                                type="text"
                                id="title"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={blog.title}
                                onChange={handleChange}
                                onBlur={handleChange}
                            />
                            {blog.title !== null && formErrors.title && <p className="text-red-500">{formErrors.title}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                                Nội dung
                            </label>
                            <textarea
                                id="content"
                                value={blog.content}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                            {blog.content !== null && formErrors.content && <p className="text-red-500">{formErrors.content}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                                Ảnh
                            </label>
                            <input
                                type="text"
                                id="image"
                                value={blog.image}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {blog.image !== null && formErrors.image && <p className="text-red-500">{formErrors.image}</p>}
                        </div>

                        <div className="mb-4 float-right">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            </>

            <ToastContainer />
        </div>
    );
};
export default BlogManager;
