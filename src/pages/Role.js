import React from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import roleService from '~/services/role';
import permissionService from '~/services/permission';

const Role = () => {
    // useState modal
    const [isOpen, setIsOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roleDetail, setRoleDetail] = useState([]);
    const [roleNameDetail, setRoleNameDetail] = useState({
        roleId: '',
        roleName: '',
    });
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

    // data
    const handleEdit = (roleId, roleName) => {
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
                <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    +
                </button>
            </div>
            <div className="w-full overflow-x-auto" style={{ paddingTop: '20px' }}>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((item, index) => (
                            <tr key={index} className={'bg-gray-100'}>
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <HiPencilAlt size={20} onClick={() => handleEdit(item._id, item.name)} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
        </div>
    );
};
export default Role;
