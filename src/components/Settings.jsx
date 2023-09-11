import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Settings() {
  const [user, setUser] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    axios.get('/users') 
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // Define a function to handle form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated user data to the backend
    axios.put('/users', user) 
      .then((response) => {
        console.log('User data updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Image URL:</label>
          <input
            type="text"
            name="image"
            value={user.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Settings;
