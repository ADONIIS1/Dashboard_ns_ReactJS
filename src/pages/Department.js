import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import departmentService from '~/services/department';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import DialogBox from '~/components/DialogBox';
import validator from 'validator';

const BlogManager = () => {
    const navigate = useNavigate();
    // useState modal
    const [isOpen, setIsOpen] = useState(false);
    const [txtSearch, setTxtSearch] = useState('');

    const openModal = () => {
        setIsOpen(true);
        setFormErrors({});
        setDepartment({
            _id : '',
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
        setFormErrors({});
        if (id !== undefined) {
            setDepartment({
                _id: id,
                name: name,
                address: address,
                phone: phone,
            });
            setIsOpen(true);
        }
    };
    const handleClick = async() => {
        departmentService
        .getAll({name : txtSearch})
        .then((response) => {
            setJsonData(response.data.filter(p => p.name.toUpperCase().includes(txtSearch.toUpperCase())));
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleDelete = async (_id) => {
        if (_id !== undefined) {
            try {
                await departmentService.delete(_id);
                setJsonData((prevData) => prevData.filter((item) => item._id !== _id));
            } catch (error) {
                console.log(error);
            }
            toast.success('🦄 Delete department success!', {
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

    const handleButtonClick = (e) => {
        navigate('/schedule');
    };

    const [department, setDepartment] = useState({
        _id : '',
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
        const errors = {};
        if (validator.isEmpty(department.name)) {
            errors.name = 'This field is required';
        }
        if (validator.isEmpty(department.address)) {
            errors.address = 'This field is required';
        }
        if (validator.isEmpty(department.phone)) {
            errors.phone = 'This field is required';
        }
        setFormErrors(errors);
    };
    const handleChangetxtSearch = (event) => {
        const txtSearch = event.target.value
        setTxtSearch(txtSearch);
    };
    const handleSubmit = async (event, _id) => {
        event.preventDefault();
        setFormErrors({});
        const errors = {};
        if (validator.isEmpty(department.name)) {
            errors.name = 'This field is required';
        }
        if (validator.isEmpty(department.address)) {
            errors.address = 'This field is required';
        }
        if (validator.isEmpty(department.phone)) {
            errors.phone = 'This field is required';
        }
        if (Object.keys(errors).length === 0) {
            if (_id === '') {
                setDepartment(department);
                await departmentService
                    .create({name : department.name,address : department.address,phone : department.phone})
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Add department success!', {
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
                setDepartment(department);
                await departmentService
                    .update(department)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Edit department success!', {
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
            departmentService
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
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Department Posts</h1>
            <div className="mt-8 flex justify-start">
                <input type='text' value={txtSearch} onChange={handleChangetxtSearch} placeholder='Nhập tên bằng cấp' className="form-control font-bold" />
                <button onClick={handleClick} className="bg-green-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">
                    Tìm kiếm
                </button> 
                <button style={{marginLeft : "700px"}} className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    Thêm mới
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
                                        <DialogBox
                                            buttonText={
                                                <span className="text-red-600 cursor-pointer hover:text-red-800">
                                                    <HiTrash size={20} />
                                                </span>
                                            }
                                            headerText="Delete department"
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
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={department.name}
                                onChange={handleChange}
                                onBlur={handleChange}
                            />
                            {department.name !== null && formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                                Address
                            </label>
                            <textarea
                                id="address"
                                value={department.address}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                            {department.name !== null && formErrors.address && <p className="text-red-500">{formErrors.address}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={department.phone}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {department.phone !== null && formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
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
