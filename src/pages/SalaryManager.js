import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import salaryService from '~/services/salary';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import DialogBox from '~/components/DialogBox';

const SalaryManager = () => {
    // useState modal
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        if(localStorage.getItem('roles').includes('Salary.CREATE')){
            setIsOpen(true);
            setSalary({
                _id : '',
                name: '',
                basic_salary: '',
                HSL: '',
            });
        }
        else{
            toast.error('Bạn không có quyền truy cập', {
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
       
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // sort

    // data
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        salaryService
            .getAll()
            .then((response) => {
                setJsonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEdit = (id, name, basic_salary, HSL) => {
        if(localStorage.getItem('roles').includes('Salary.UPDATE')){
            setFormErrors({});
            if (id !== undefined) {
                setSalary({
                    _id: id,
                    name: name,
                    basic_salary: basic_salary,
                    HSL: HSL,
                });
                setIsOpen(true);
            }
        }
        else{
            toast.error('Bạn không có quyền truy cập', {
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
       
        
    };

    const handleDelete = async (id) => {
        if (id !== undefined) {
            try {
                await salaryService.delete(id);
                setJsonData((prevData) => prevData.filter((item) => item._id !== id));
            } catch (error) {
                console.log(error);
            }
            toast.success('🦄 Delete Salary success!', {
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

    const [salary, setSalary] = useState({
        name: '',
        basic_salary: '',
        HSL: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setSalary((prevState) => ({
            ...prevState,
            [id]: value,
        }));

        const errors = {};
        if (!value && validator.isEmpty(salary.name)) {
            errors.name = 'This field is required';
        }
        if (!value && validator.isEmpty(parseFloat(salary.basic_salary))) {
            errors.basic_salary = 'This field is required';
        }
        if (!value && validator.isEmpty(parseInt(salary.HSL))) {
            errors.HSL = 'This field is required';
        }
        setFormErrors(errors);
    };

    const handleSubmit = async (event, id) => {
        event.preventDefault();
        const errors = {};
        setFormErrors(errors);

        if (validator.isEmpty(salary.name)) {
            errors.name = 'This field is required';
        }
        if (validator.isEmpty(salary.basic_salary)) {
            errors.basic_salary = 'This field is required';
        }
        if (validator.isEmpty(salary.HSL)) {
            errors.HSL = 'This field is required';
        }

        if (Object.keys(errors).length === 0) {
            if (id === '') {
                setSalary(salary);
                await salaryService
                    .create({name : salary.name,basic_salary : salary.basic_salary,HSL : salary.HSL})
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
                setSalary(salary);
                await salaryService
                    .update(salary)
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
            salaryService
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
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Salary Posts</h1>
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
                            >
                                Tên
                            </th>
                            <th
                                className="px-4 py-2"
                            >
                                Lương cơ bản
                            </th>
                            <th
                                className="px-4 py-2"
                            >
                                Hệ số lương
                            </th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((post, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{post.name}</td>
                                <td className="border px-4 py-2">{post.basic_salary}</td>
                                <td className="border px-4 py-2">{post.HSL}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiPencilAlt size={20} onClick={() => handleEdit(post._id, post.name, post.basic_salary, post.HSL)} />
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
                    <form onSubmit={(event) => handleSubmit(event, salary._id)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={salary.name}
                                onChange={handleChange}
                                onBlur={handleChange}
                            />
                            {salary.name !== null && formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="basic_salary" className="block text-gray-700 font-bold mb-2">
                                Basic_salary
                            </label>
                            <textarea
                                id="basic_salary"
                                value={salary.basic_salary}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                            {salary.basic_salary !== null && formErrors.basic_salary && <p className="text-red-500">{formErrors.basic_salary}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="HSL" className="block text-gray-700 font-bold mb-2">
                                HSL
                            </label>
                            <input
                                type="text"
                                id="HSL"
                                value={salary.HSL}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {salary.HSL !== null && formErrors.HSL && <p className="text-red-500">{formErrors.HSL}</p>}
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
export default SalaryManager;
