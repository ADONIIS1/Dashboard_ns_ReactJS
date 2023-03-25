import { ICONS } from '@syncfusion/ej2/filemanager';
import { ColorValue } from '@syncfusion/ej2/maps';
import React, { useState } from 'react';

function Information() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    address: '',
    birthday: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl flex flex-col md:flex-row justify-center items-center my-10 px-8 py-6 bg-white shadow-lg">
        <div className="w-full md:w-3/5 flex justify-center">
          <img src={"https://i.pinimg.com/736x/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.jpg"} alt="Profile" className="w-400 rounded-full" />
          <button className=" bottom-0 left-0 text-black rounded-full h-12 w-12 flex justify-center items-center hover:bg-red-300" onSubmit={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <i class="gg-camera"></i>
          </button>
        </div>
        <div className="w-full md:w-2/5 px-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email
                <span style={{color: 'red'}}>*</span>
              </label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">Date of Birth</label>
              <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
              <textarea name="address" id="address" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Information;
