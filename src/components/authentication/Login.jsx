import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/sign_in', {
        user: {
          email: email,
          password: password,
        },
      });

      // const { token } = response.data; // Assuming the token is returned in the response

      // // Store token in localStorage
      // localStorage.setItem('accessToken', token);


      console.log('Login successful!', response.data);
      // localStorage.setItem('token', response.data.token)
      setWarning('User not authaurized');

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response.data);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
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
