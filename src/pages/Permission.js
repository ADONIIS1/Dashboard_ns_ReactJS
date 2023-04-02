import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import departmentService from '~/services/department';
import { useNavigate } from 'react-router-dom';

const BlogManager = () => {
    const navigate = useNavigate();
    // useState modal
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setDepartment({
            name: '',
            address: '',
            phone: '',
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
        departmentService
            .getAll({})
            .then((response) => {
                setJsonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEdit = (id, name, address, phone) => {
        if (id !== null) {
            openModal();
            setDepartment({
                _id: id,
                name: name,
                address: address,
                phone: phone,
            });
        }
    };

    const handleDelete = (e) => {
        navigate('/departmentManager');
    };

    const [department, setDepartment] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setDepartment((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (event, _id) => {
        event.preventDefault();

        if (_id === undefined) {
            setDepartment(department);
            await departmentService
                .create(department)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    return err;
                });
        } else {
            setDepartment(department);
            await departmentService
                .update(_id, department)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    return err;
                });
        }
        departmentService
            .getAll({})
            .then((response) => {
                setJsonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        closeModal();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Department Posts</h1>
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
                                onClick={() => setSorting({ criteria: 'name', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Name
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'address', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Address
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'phone', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Phone
                            </th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.sort(getSortingFunction(sorting.criteria, sorting.direction)).map((post, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{post.name}</td>
                                <td className="border px-4 py-2">{post.address}</td>
                                <td className="border px-4 py-2">{post.phone}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiPencilAlt size={20} onClick={() => handleEdit(post._id, post.name, post.address, post.phone)} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <HiTrash size={20} onClick={handleDelete} />
                                        </button>
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
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18.293 3.293a1 1 0 00-1.414 0L10 8.586 4.707 3.293a1 1 0 10-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 001.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.879-5.879a1 1 0 000-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <form onSubmit={(event) => handleSubmit(event, department._id)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                Tiêu đề
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={department.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                                Nội dung
                            </label>
                            <textarea
                                id="address"
                                value={department.address}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                                Ảnh
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={department.phone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Lưu
                        </button>
                    </form>
                </Modal>
            </>
        </div>
    );
};
export default BlogManager;
