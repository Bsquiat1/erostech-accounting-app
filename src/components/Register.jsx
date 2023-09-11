import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // Updated state name
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setErrors({ passwordConfirmation: 'Password and password confirmation do not match' });
      return;
    }

    try {
      const response = await axios.post('/users', {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation, // Ensure this matches your backend attribute name
        },
      });

      // Assuming successful response here
      const { data } = response;

      // Store the JWT token in local storage or cookies
      localStorage.setItem('jwtToken', data.token);

      console.log('Registered successfully!', data);
      // You can redirect to a login page or handle navigation as needed
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(error.response.data.errors || {});
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full border rounded-lg py-2 px-3 ${
                errors.name ? 'border-red-500' : ''
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full border rounded-lg py-2 px-3 ${
                errors.email ? 'border-red-500' : ''
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full border rounded-lg py-2 px-3 ${
                errors.password ? 'border-red-500' : ''
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="block font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              className={`w-full border rounded-lg py-2 px-3 ${
                errors.passwordConfirmation ? 'border-red-500' : ''
              }`}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
            {errors.password_confirmation && (
              <p className="text-red-500 mt-1">{errors.passwordConfirmation}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
