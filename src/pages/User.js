import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import userService from '~/services/user';
import { useNavigate } from 'react-router-dom';

const UserManager = () => {
    const navigate = useNavigate();
    // useState modal
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setUser({
            email: '',
            phone: '',
            address: '',
            avatar: '',
            username: '',
            fullname: '',
            birthDay: '',
            departmentID: '',
            degreeID: '',
            salaryID: '',
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
        userService
            .getAll({})
            .then((response) => {
                setJsonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // lấy department option
        userService
            .getDepartment({})
            .then((response) => {
                setOptionDepartment(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        //lấy degree option
        userService
            .getDegree({})
            .then((response) => {
                setOptionDegree(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        //lấy salary option
        userService
            .getSalary({})
            .then((response) => {
                setOptionSalary(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEdit = (_id, email, phone, address, avatar, fullname, birthDay, departmentID, degreeID, salaryID) => {
        if (_id !== undefined) {
            setUser({
                ...user,
                _id: _id,
                email: email,
                phone: phone,
                address: address,
                avatar: avatar,
                fullname: fullname,
                birthDay: birthDay,
                departmentID: departmentID,
                degreeID: degreeID,
                salaryID: salaryID,
            });

            for (let i = 0; i < optionDepartment.length; i++) {
                if (optionDepartment[i]._id === departmentID) {
                    setSelectedDepartment(optionDepartment[i]);
                }
            }

            for (let j = 0; j < optionDegree.length; j++) {
                if (optionDegree[j]._id === degreeID) {
                    setSelectedDegree(optionDegree[j]);
                }
            }

            for (let k = 0; k < optionSalary.length; k++) {
                if (optionSalary[k]._id === salaryID) {
                    setSelectedSalary(optionSalary[k]);
                }
            }

            setIsOpen(true);
        }
    };

    const handleDelete = (e) => {
        navigate('/departmentManager');
    };

    const [user, setUser] = useState({
        _id: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        fullname: '',
        username: '',
        birthDay: '',
        departmentID: '',
        degreeID: '',
        salaryID: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (event, _id) => {
        event.preventDefault();

        if (_id == undefined) {
            setUser(user);
            await userService
                .create(user)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    return err;
                });
        } else {
            setUser(user);
            await userService
                .update(_id, user)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    return err;
                });
        }
        userService
            .getAll({})
            .then((response) => {
                setJsonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        closeModal();
    };

    // data
    const [optionDepartment, setOptionDepartment] = useState([]);
    const [optionDegree, setOptionDegree] = useState([]);
    const [optionSalary, setOptionSalary] = useState([]);

    ///set date
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState([]);

    //get value combobox

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
                                onClick={() => setSorting({ criteria: 'image', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Image
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'email', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Email
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'phone', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                Phone
                            </th>
                            <th
                                className="px-4 py-2"
                                onClick={() => setSorting({ criteria: 'birthday', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}
                            >
                                BirthDay
                            </th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.sort(getSortingFunction(sorting.criteria, sorting.direction)).map((post, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{post.fullname}</td>
                                <td className="border px-4 py-2">
                                    <img src={post.avatar} alt={post.name} className="w-24 h-auto" />
                                </td>
                                <td className="border px-4 py-2">{post.departmentID}</td>
                                <td className="border px-4 py-2">{post.phone}</td>
                                <td className="border px-4 py-2">
                                    {new Date(post.birthDay).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </td>
                                <td className="border px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiPencilAlt
                                                size={20}
                                                onClick={() =>
                                                    handleEdit(
                                                        post._id,
                                                        post.email,
                                                        post.phone,
                                                        post.address,
                                                        post.avatar,
                                                        post.fullname,
                                                        post.birthDay,
                                                        post.departmentID,
                                                        post.degreeID,
                                                        post.salaryID,
                                                    )
                                                }
                                            />
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
                    <form onSubmit={(event) => handleSubmit(event, user._id)}>
                        <div className="mb-4">
                            <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">
                                Fullname
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.fullname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                                Avatar
                            </label>
                            <input
                                type="text"
                                id="avatar"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.avatar}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                readonly
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">
                                BirthDay
                            </label>
                            <input
                                type="date"
                                id="birthDay"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.birthDay ? user.birthDay.slice(0, 10) : ''}
                                onChange={handleChange}
                                max={new Date().toISOString().slice(0, 10)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                                Department
                            </label>
                            <select
                                id="departmentID"
                                value={selectedDepartment.name}
                                onChange={handleChange}
                                name="departmentID"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {optionDepartment.map((option) => (
                                    <option key={option._id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                                Degree
                            </label>
                            <select
                                id="degreeID"
                                value={selectedDegree.name}
                                name="degreeID"
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {optionDegree.map((option) => (
                                    <option key={option._id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                                Salary
                            </label>
                            <select
                                id="salaryID"
                                value={selectedSalary.name}
                                name="salaryID"
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {optionSalary.map((option) => (
                                    <option key={option._id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
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
export default UserManager;
