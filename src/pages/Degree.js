import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import degreeService from '~/services/degree';
import { ToastContainer, toast } from 'react-toastify';
import DialogBox from '~/components/DialogBox';
import validator from 'validator';

const Degree = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [txtSearch, setTxtSearch] = useState('');
    const openModal = () => {
        setIsOpen(true);
        setFormErrors({});
        setDegree({
            name: '',
            specialized: '',
            majors: '',
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
        degreeService
            .getAll({})
            .then((response) => {
                console.log('Check ',response);
                setJsonData(response.data);
            })
    }, []);
    console.log('Check',jsonData);
    const handleEdit = (_id, name, specialized, majors) => {
        setFormErrors({});
        if (_id !== null) {
            setDegree({
                _id: _id,
                name: name,
                specialized: specialized,
                majors: majors,
            });
        }
        setIsOpen(true);
    };
    const handleClick = async() => {
        degreeService
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
                await degreeService.delete(_id);
                setJsonData((prevData) => prevData.filter((item) => item._id !== _id));
            } catch (error) {
                console.log(error);
            }

            toast.success('🦄 Delete degree success!', {
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

    const [degree, setDegree] = useState({
        name: '',
        specialized: '',
        majors: '',
    });

    const handleChange = (event) => {
        const { _id, value } = event.target;
        setDegree((prevState) => ({
            ...prevState,
            [_id]: value,
        }));
        const errors = {};
        if (validator.isEmpty(degree.name)) {
            errors.name = 'This field is required';
        }
        if (validator.isEmpty(degree.specialized)) {
            errors.specialized = 'This field is required';
        }
        if (validator.isEmpty(degree.majors)) {
            errors.majors = 'This field is required';
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
        if (validator.isEmpty(degree.name)) {
            errors.name = 'This field is required';
        }
        if (validator.isEmpty(degree.specialized)) {
            errors.specialized = 'This field is required';
        }
        if (validator.isEmpty(degree.majors)) {
            errors.majors = 'This field is required';
        }
        if (Object.keys(errors).length === 0) {
            if (_id === undefined) {
                setDegree(degree);
                await degreeService
                    .create(degree)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Add degree success!', {
                    position: 'top-right',
                    autoClose: 5000,
                    h_ideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                setDegree(degree);
                await degreeService
                    .update(_id, degree)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Edit degree success!', {
                    position: 'top-right',
                    autoClose: 5000,
                    h_ideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }
            degreeService
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

    // val_idation
    const [formErrors, setFormErrors] = useState('123');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Degree Posts</h1>
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
                                onClick={() => setSorting({ criteria: 'specialized', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Specialized
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'majors', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Majors
                            </th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((post, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{post.name}</td>
                                <td className="border px-4 py-2">{post.specialized}</td>
                                <td className="border px-4 py-2">{post.majors}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiPencilAlt size={20} onClick={() => handleEdit(post._id, post.name, post.specialized, post.majors)} />
                                        </button>
                                        <DialogBox
                                            buttonText={
                                                <span className="text-red-600 cursor-pointer hover:text-red-800">
                                                    <HiTrash size={20} />
                                                </span>
                                            }
                                            headerText="Delete Degree"
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
                    <form onSubmit={(event) => handleSubmit(event, degree._id)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={degree.name}
                                onChange={handleChange}
                                onBlur={handleChange}
                            />
                            {degree.name !== null && formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="specialized" className="block text-gray-700 font-bold mb-2">
                                Specialized
                            </label>
                            <textarea
                                id="specialized"
                                value={degree.specialized}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                            {degree.specialized !== null && formErrors.specialized && <p className="text-red-500">{formErrors.specialized}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="majors" className="block text-gray-700 font-bold mb-2">
                                Majors
                            </label>
                            <input
                                type="text"
                                id="majors"
                                value={degree.majors}
                                onChange={handleChange}
                                onBlur={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {degree.majors !== null && formErrors.majors && <p className="text-red-500">{formErrors.majors}</p>}
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
export default Degree;
