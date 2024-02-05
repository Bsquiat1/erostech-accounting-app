import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      });

      // Assuming the response contains a token or user data
      console.log(response.data);
      if(response.data.success){
        Cookies.set('token', response.data.token);
        navigate('/dashboard'); 
      }else{

      }

      // Redirect or handle success based on the response
      // navigate('/dashboard'); 
    } catch (error) {
      console.error('Login failed:', error.message);
  
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-lg py-2 px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-lg py-2 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;