import React from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect} from 'react';
import Modal from "../components/Modal";
import userService from '~/services/user';
import {useNavigate} from 'react-router-dom'

const Test = () => {
  const navigate = useNavigate();
  // useState modal
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setUser(true);
    setUser({
      email : "",
      phone : "",
      address : "",
      avatar : "",
      fullname : "",
      birthDay: "",
      departmentID : "",
      degreeID: "",
      salaryID: "",
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
    userService.getAll({})
      .then(response => {
        console.log("Dateaaaaaaaaaaa")

        console.log(response.data)
        setJsonData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEdit = (id,email, phone,address,fullname,avatar,birthDay,departmentID,degreeID,salaryID) => {
    if(id !== null){
      openModal()
      setUser({
      _id: id,
      email : email,
      phone : phone,
      address : address,
      avatar : avatar,
      fullname : fullname,
      birthDay: birthDay,
      departmentID : departmentID,
      degreeID: degreeID,
      salaryID: salaryID,
      });
    }
    
  };

  const handleDelete = (e) => {
    navigate('/departmentManager')
  };


  const [user,setUser] = useState({
    email : "",
      phone : "",
      address : "",
      avatar : "",
      fullname : "",
      birthDay: "",
      departmentID : "",
      degreeID: "",
      salaryID: "",
  });

  

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value, 
    }));
  };

  const handleSubmit = async (event,_id) => {
    event.preventDefault();
    
    if(_id == undefined){
      setUser(user);
      await userService.create(user).then(res => {
        return res;
      }).catch((err) => {
        return err;
      });    

    }
    else{
      setUser(user);
      await userService.update(_id,user).then(res => {
        return res;
      }).catch((err) => {
        return err;
      });

    }
    userService.getAll({})
      .then(response => {
        setJsonData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      closeModal()
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
              <th className="px-4 py-2" onClick={() => setSorting({ criteria: 'name', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}>Name</th>
              <th className="px-4 py-2" onClick={() => setSorting({ criteria: 'image', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}>Image</th>
              <th className="px-4 py-2" onClick={() => setSorting({ criteria: 'email', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}>Email</th>
              <th className="px-4 py-2" onClick={() => setSorting({ criteria: 'phone', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}>Phone</th>
              <th className="px-4 py-2" onClick={() => setSorting({ criteria: 'birthday', direction: sorting.direction === 'asc' ? 'desc' : 'asc' })}>BirthDay</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.sort(getSortingFunction(sorting.criteria, sorting.direction)).map((post, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border px-4 py-2">{post.fullname}</td>
                <td className="border px-4 py-2"><img src={post.avatar} alt={post.name} className="w-24 h-auto" /></td>
                <td className="border px-4 py-2">{post.email}</td>
                <td className="border px-4 py-2">{post.phone}</td>
                <td className="border px-4 py-2">{new Date(post.birthDay).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800"><HiPencilAlt size={20} onClick={() => handleEdit(user.id,user.email, user.phone,user.address,user.avatar,user.fullname,user.birthDay,user.departmentID,user.degreeID,user.salaryID)}/></button>
                    <button className="text-red-600 hover:text-red-800"><HiTrash size={20} onClick={handleDelete}/></button>
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


