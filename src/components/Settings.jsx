import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { update, updateProfileImage } from '../redux/userSlice';

function Settings() {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
 
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {

      const response = await axios.get('/member_details');

     
      dispatch(update(response.data));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(update({ ...userData, [name]: value }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    dispatch(updateProfileImage({ profileImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      if (userData.profileImage) {
        formData.append('profileImage', userData.profileImage);
      }

      const response = await axios.put('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(update({ name: userData.name, email: userData.email }));

      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error updating profile. Please try again.');
      setSuccessMessage('');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-40">
      {successMessage && (
        <div className="bg-green-100 text-green-700 border border-green-400 rounded p-2 mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 border border-red-400 rounded p-2 mb-4">
          {errorMessage}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="profileImage" className="block text-gray-700 font-bold mb-2">
          Profile Image:
        </label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={handleImageChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default Settings;
