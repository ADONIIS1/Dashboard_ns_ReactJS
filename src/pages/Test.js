import React from 'react';
import { HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import userService from '~/services/user';
import { useNavigate, generatePath } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

const Test = () => {
    const navigate = useNavigate();

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
    }, []);

    const handleUnBan = async (event, _id) => {
        event.preventDefault();
        if (_id !== undefined) {
            try {
                await userService.unBanUser(_id);
                setJsonData((prevData) => prevData.filter((item) => item._id !== _id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDelete = async (event, _id) => {
        event.preventDefault();
        console.log('Check id:', _id);

        if (_id !== undefined) {
            try {
                await userService.delete(_id);
                setJsonData((prevData) => prevData.filter((item) => item._id !== _id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    //get value combobox

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">User banned</h1>
            <div className="mt-8 flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        navigate(generatePath('/usermanager'));
                    }}
                >
                    Back
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

                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData
                            .filter((post) => post.active === false)
                            .sort(getSortingFunction(sorting.criteria, sorting.direction))
                            .map((post, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{post.fullname}</td>
                                    <td className="border px-4 py-2">
                                        <img src={post.avatar} alt={post.name} className="w-24 h-auto" />
                                    </td>
                                    <td className="border px-4 py-2">{post.email}</td>
                                    <td className="border px-4 py-2">{post.phone}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <FaPlusCircle size={20} onClick={(event) => handleUnBan(event, post._id)} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <HiTrash size={20} onClick={(event) => handleDelete(event, post._id)} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Test;
