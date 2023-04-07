import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import userService from '~/services/user';
import roleService from '~/services/role';
import { ToastContainer, toast } from 'react-toastify';
import DialogBox from '~/components/DialogBox';
import validator from 'validator';

const UserManager = () => {
    // useState modal
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const openModal = () => {
        if(localStorage.getItem('roles').includes('User.CREATE','User.UPDATE')){
            setIsOpen(true);
            setFormErrors({});
            setUser({
                email: '',
                phone: '',
                address: '',
                password : '',
                avatar: '',
                username: '',
                fullname: '',
                birthDay: '',
                departmentID: '',
                degreeID: '',
                salaryID: '',
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
    const openModal2 = () => {
        if(localStorage.getItem('roles').includes('User.CREATE','User.UPDATE')){
            setIsOpen2(true);
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

    const closeModal2 = () => {
        setIsOpen2(false);
    };

    // // sort
    // const [sorting, setSorting] = useState({ criteria: null, direction: 'asc' });

    // const getSortingFunction = (criteria, direction) => {
    //     const directionModifier = direction === 'asc' ? 1 : -1;
    //     return (a, b) => {
    //         if (a[criteria] < b[criteria]) {
    //             return -1 * directionModifier;
    //         }
    //         if (a[criteria] > b[criteria]) {
    //             return 1 * directionModifier;
    //         }
    //         return 0;
    //     };
    // };

    // data
    const [jsonData, setJsonData] = useState([]);
    const [lstRole,setLstRole] = useState([])
    const [rolesData,setRolesData] = useState([])
    const [userDetail,setUserDetail] = useState({
        _id : '',
        fullname : ''
    })
    useEffect(() => {
        userService
            .getAll()
            .then((response) => {
                setJsonData(response.data);
            })

        // lấy department option
        userService
            .getDepartment()
            .then((response) => {
                setOptionDepartment(response.data);
            })
            .catch((error) => {
            });

        //lấy degree option
        userService
            .getDegree()
            .then((response) => {
                setOptionDegree(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        //lấy salary option
        userService
            .getSalary()
            .then((response) => {
                setOptionSalary(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        roleService.getAll().then(res => {
            setLstRole(res.data)
        })
    }, []);
    const handleEditRole = (userId, fullname) => {
        setUserDetail({
            _id : userId,
            fullname : fullname
        })
        userService.getById(userId).then((res) => {
            setRolesData(res.data.roles);
        });
        if (userId !== null) {
            openModal2();
        }
    };
    const handleEdit = (id, email, phone, address, password,avatar, fullname, birthDay, departmentID, degreeID, salaryID) => {
        //setFormErrors({});

        if (id !== undefined) {
            setUser({
                ...user,
                _id: id,
                email: email,
                phone: phone,
                address: address,
                password : password,
                avatar: avatar,
                fullname: fullname,
                birthDay: birthDay,
                departmentID: departmentID,
                degreeID: degreeID,
                salaryID: salaryID,
            });

            for (let i = 0; i < optionDepartment.length; i++) {
                if (optionDepartment[i].id === departmentID) {
                    setSelectedDepartment(optionDepartment[i]);
                }
            }

            for (let j = 0; j < optionDegree.length; j++) {
                if (optionDegree[j].id === degreeID) {
                    setSelectedDegree(optionDegree[j]);
                }
            }

            for (let k = 0; k < optionSalary.length; k++) {
                if (optionSalary[k].id === salaryID) {
                    setSelectedSalary(optionSalary[k]);
                }
            }

            setIsOpen(true);
        }
    };

    const handleDelete = async (id, email, phone, address, password,avatar, fullname, birthDay, departmentID, degreeID, salaryID) => {
        if (id !== undefined) {
            try {

                await userService.update(user);
                setJsonData((prevData) => prevData.filter((item) => item._id !== id));
            } catch (error) {
            }
            toast.success('🦄 Lock user success!', {
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

    const [user, setUser] = useState({
        _id: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        fullname: '',
        password : '',
        username: '',
        birthDay: '',
        departmentID : '',
        degreeID : '',
        salaryID : ''
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        if (id === 'departmentID') {
            setSelectedDepartment(value);
        } else if (id === 'degreeID') {
            setSelectedDegree(value);
        } else if (id === 'salaryID') {
            setSelectedSalary(value);
        }
        const errors = {};
        if (!value & validator.isEmpty(user.fullname)) {
            errors.fullname = 'This field is required';
        }
        if (!value & validator.isEmpty(user.avatar)) {
            errors.avatar = 'This field is required';
        }
        if (!value & validator.isEmail(user.email)) {
            errors.email = 'This field is required';
        }
        if (!value & validator.isEmpty(user.phone)) {
            errors.phone = 'This field is required';
        }
        if (!value & validator.isDate(user.birthDay)) {
            errors.birthDay = 'This field is required';
        }
        if (!value & validator.isEmpty(user.address)) {
            errors.adress = 'This field is required';
        }
        setFormErrors(errors);
    };

    const handleSubmit = async (event, _id) => {
        event.preventDefault();
        setFormErrors({});
        const errors = {};

        if (validator.isEmpty(user.fullname)) {
            errors.fullname = 'This field is required';
        }
        if (validator.isEmpty(user.avatar)) {
            errors.avatar = 'This field is required';
        }
        if (validator.isEmpty(user.email)) {
            errors.email = 'This field is required';
        }
        if (validator.isEmpty(user.phone)) {
            errors.phone = 'This field is required';
        }
        if (validator.isEmpty(user.birthDay)) {
            errors.birthDay = 'This field is required';
        }
        if (validator.isEmpty(user.address)) {
            errors.address = 'This field is required';
        }

        if (Object.keys(errors).length === 0) {
            if (_id === undefined) {
                setUser(user);
                let dataa = {avatar : user.avatar,fullname : user.fullname,active : true,password : '123456',email : user.email,address : user.address,phone : user.phone,degreeID : user.degreeID,
        departmentID : user.departmentID,salaryID : user.salaryID}
                await userService
                    .create(dataa)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Add user success!', {
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
                setUser(user);
                const dataUpdate = {_id : user._id,avatar : user.avatar,fullname : user.fullname,active : true,email : user.email,address : user.address,phone : user.phone,degreeID : user.degreeID,
        departmentID : user.departmentID,salaryID : user.salaryID}
                await userService
                    .update(dataUpdate)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        return err;
                    });
                toast.success('🦄 Edit user success!', {
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
            userService
                .getAll()
                .then((response) => {
                    setJsonData(response.data);
                })
                .catch((error) => {
                });
            closeModal();
        } else {
            setFormErrors(errors);
        }
    };

    const handleSubmit2 = async (event) => {
        event.preventDefault();
        userService.addRolestoUser({ id: userDetail._id, roles: rolesData }).then((res) => {
            console.log(res);
        });
        toast.success('🦄 Cập Nhật quyền thành công !', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
        closeModal2();
    };

    // // data
    const [optionDepartment, setOptionDepartment] = useState([]);
    const [optionDegree, setOptionDegree] = useState([]);
    const [optionSalary, setOptionSalary] = useState([]);

    ///set date
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState([]);
    function handleChecked(event) {
        let check = event.target.checked;
        let check_id = event.target.value;
        console.log(check_id);
        if (check) {
            setRolesData((items) => [...items, check_id]);
        } else {
            let data = rolesData.filter((item) => item !== check_id);
            setRolesData(data);
        }

    }
    /// Modal confirm
    const handleCancel = () => {
        console.log('Cancel button clicked');
    };

    // // validation
     const [formErrors, setFormErrors] = useState('123');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Manage User </h1>
            <div className="mt-8 flex justify-end">
                <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    Thêm mới
                </button>
            </div>
            <div className="w-full overflow-x-auto" style={{ paddingTop: '20px' }}>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th
                                className="px-4 py-2"
                            >
                                Full Name
                            </th>
                            <th
                                className="px-4 py-2"
                            >
                                Email
                            </th>
                            <th
                                className="px-4 py-2"
                            >
                                Số điện thoại
                            </th>
                            {/* <th
                                className="px-4 py-2"
                            >
                                Lương
                            </th>
                            <th
                                className="px-4 py-2"
                            >
                                Bằng Cấp
                            </th>
                            <th
                                className="px-4 py-2"
                            >
                                Phòng Ban
                            </th> */}
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData
                            .filter((post) => post.active === true)
                            .map((post, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{post.fullname}</td>
                                    {/* <td className="border px-4 py-2">
                                        <img src={post.avatar} alt={post.username} className="w-24 h-auto" />
                                    </td> */}
                                    <td className="border px-4 py-2">{post.email}</td>
                                    <td className="border px-4 py-2">{post.phone}</td>
                                    {/* <td className="border px-4 py-2">
                                        {new Date(post.birthDay).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td> */}
                                    {/* <td className="border px-4 py-2">{post.salary.name}</td>
                                    <td className="border px-4 py-2">{post.degree.name}</td>
                                    <td className="border px-4 py-2">{post.department.name}</td> */}

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
                                                            post.password,
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
                                            <button className="text-blue-600 hover:text-blue-800" title='Edit RolesToUser'>
                                                <HiPencilAlt
                                                    size={20}
                                                    onClick={() =>
                                                        handleEditRole(
                                                            post._id,
                                                            post.fullname
                                                        )
                                                    }
                                                />
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
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.fullname}
                                onChange={handleChange}
                                onBlur={handleChange}
                            />
                            {user.fullname !== null && formErrors.fullname && <p className="text-red-500">{formErrors.fullname}</p>}
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
                                onBlur={handleChange}
                            />
                            {user.avatar !== null && formErrors.avatar && <p className="text-red-500">{formErrors.avatar}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.email}
                                onChange={handleChange}
                                onBlur={handleChange}
                            />
                            {user.email !== null && formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
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
                                onBlur={handleChange}
                            />
                            {user.phone !== null && formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
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
                            {user.birthDay !== null && formErrors.birthDay && <p className="text-red-500">{formErrors.birthDay}</p>}
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
                                onBlur={handleChange}
                            />
                            {user.address !== null && formErrors.address && <p className="text-red-500">{formErrors.address}</p>}
                        </div> 

                         <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                                Department
                            </label>
                            <select
                                id="departmentID"
                                value={selectedDepartment._id}
                                onChange={handleChange}
                                name="departmentID"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {optionDepartment.map((option) => (
                                    <option key={option._id} value={option._id}>
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
                                value={selectedDegree._id}
                                name="degreeID"
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {optionDegree.map((option) => (
                                    <option key={option._id} value={option._id}>
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
                                value={selectedSalary._id}
                                name="salaryID"
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {optionSalary.map((option) => (
                                    <option key={option.id} value={option._id}>
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
            <Modal isOpen={isOpen2} onClose={closeModal2} title={`Phân quyền cho ${ userDetail.fullname}`}>
                    <button
                        className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline"
                        onClick={closeModal2}
                    >
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18.293 3.293a1 1 0 00-1.414 0L10 8.586 4.707 3.293a1 1 0 10-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 001.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.879-5.879a1 1 0 000-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <form onSubmit={handleSubmit2}>
                        <div className="mb-4" style={{ width: '400px' }}>
                            {lstRole.map((item, index) => (
                                <tr key={index} className={'bg-gray-100'} style={{ width: '400px' }}>
                                    {(
                                        <div
                                            style={{
                                                width: '200px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                placeItems: 'flex-end',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <td className="px-4 py-2">{item.name}</td>
                                            <td>
                                                <input
                                                    style={{ width: '20px' }}
                                                    type="checkbox"
                                                    value={item._id}
                                                    checked={rolesData.includes(item._id) ? true : false}
                                                    onChange={handleChecked}
                                                />
                                            </td>
                                        </div>
                                    )}
                                </tr>
                            ))}
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Lưu
                            </button>
                        </div>
                    </form>
                </Modal>
            <ToastContainer />
        </div>
    );
};
export default UserManager;
