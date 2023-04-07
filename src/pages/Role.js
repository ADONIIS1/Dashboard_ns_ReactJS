import React from 'react';
import { HiPencilAlt,HiUser } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import roleService from '~/services/role';
import permissionService from '~/services/permission';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';

const Role = () => {
    // useState modal
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roleDetail, setRoleDetail] = useState([]);
    const [roleNameDetail, setRoleNameDetail] = useState({
        roleId: '',
        roleName: '',
    });
    let [title,setTitle] = useState(``);
    const [role, setRole] = useState({
        _id: '',
        name: '',
    });
    const [formErrors, setFormErrors] = useState('');
    const handleChange = (event) => {
        const { id, value } = event.target;
        setRole({ ...role, [event.target.name]: event.target.value });

        const errors = {};
        if (validator.isEmpty(role.name)) {
            errors.name = 'This field is required';
        }
        setFormErrors(errors);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    useEffect(() => {
        permissionService.getAll().then((res) => {
            setPermissions(res.data);
        });
        roleService.getAll().then((res) => {
            setRoles(res.data);
        });
    }, []);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal2 = (id,name) => {
        if(localStorage.getItem('roles').includes('Role.CREATE','Role.UPDATE')){
            setTitle(`Thêm mới quyền`);
            if(id && name) {
                console.log('Check');
                setTitle(`Sửa quyền ${name}`)
            }
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
    const closeModal2 = () => {
        setIsOpen2(false);
        setRole({
            _id: '',
            name: '',
        })
    };
    // data
    const handleEdit = (roleId, roleName) => {
        setRole({
            _id : roleId,
            name : roleName
        })
        roleService.getById(roleId).then((res) => {
            setRoleDetail(res.data.permissions);
        });
        setRoleNameDetail({
            roleId: roleId,
            roleName: roleName,
        });
        if (roleId !== null) {
            openModal();
        }
    };
    const handleSubmitCreateorUpdate = async(event) => {
        event.preventDefault();
        if(role._id === ''){
            const data = await roleService.create({name : role.name}).
                then(res => res)
            if(data.status === 400){
                toast.error(data.data, {
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

        }
        else{
           await roleService.update(role)
           toast.success('Sửa quyền thành công', {
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
        await roleService.getAll().then((res) => {
            setRoles(res.data);
        });
        closeModal2();
    }
    const handleEditRole = (roleId, roleName) => {
        setRole({
            _id : roleId,
            name : roleName
        })
        if (roleId !== null) {
            openModal2(roleId,roleName);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        roleService.addPermissiontoRole({ id: roleNameDetail.roleId, permissions: roleDetail }).then((res) => {
            console.log(res);
        });
        closeModal();
    };

    function handleChecked(event) {
        let check = event.target.checked;
        let check_id = event.target.value;
        if (check) {
            setRoleDetail((items) => [...items, check_id]);
        } else {
            let data = roleDetail.filter((item) => item !== check_id);
            setRoleDetail(data);
        }

        // console.log(data);
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Roles</h1>
            <div className="mt-8 flex justify-end">
                <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={openModal2}>
                    +
                </button>
            </div>
            <div className="w-full overflow-x-auto" style={{ paddingTop: '20px' }}>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Tên quyền</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((item, index) => (
                            <tr key={index} className={'bg-gray-100'}>
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiPencilAlt size={20} onClick={() => handleEditRole(item._id, item.name)} />
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiUser size={20} onClick={() => handleEdit(item._id, item.name)} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <>
                <Modal isOpen={isOpen2} onClose={closeModal2} title={title}>
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
                    <form style={{marginTop : "50px"}} onSubmit={handleSubmitCreateorUpdate}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                Tên Quyền
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={role.name}
                                onChange={handleChange}
                                onBlur={handleChange}
                            />
                            {role.name !== null && formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                            <div style={{marginTop : "20px"}} className="mb-4 float-right">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </>                           
            <>
                <Modal isOpen={isOpen} onClose={closeModal} title={`Phân quyền cho ${roleNameDetail.roleName}`}>
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
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4" style={{ width: '400px' }}>
                            {permissions.map((item, index) => (
                                <tr key={index} className={'bg-gray-100'} style={{ width: '400px' }}>
                                    {item.name.includes('.') ? (
                                        <div
                                            style={{
                                                width: '200px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                placeItems: 'flex-end',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <td className="px-4 py-2">{item.display}</td>
                                            <td>
                                                <input
                                                    style={{ width: '20px' }}
                                                    type="checkbox"
                                                    value={item._id}
                                                    checked={roleDetail.includes(item._id) ? true : false}
                                                    onChange={handleChecked}
                                                />
                                            </td>
                                        </div>
                                    ) : (
                                        <div style={{ width: '200px' }}>
                                            <td className="px-4 py-2" style={{ color: 'red' }}>
                                                {item.display}
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
            </>
            <ToastContainer/>
        </div>
    );
};
export default Role;
