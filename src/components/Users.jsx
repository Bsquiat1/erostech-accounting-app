import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    // Fetch users from the backend API when the component mounts
    axios.get('/users') // Replace with your API endpoint for fetching users
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (userId) => {
    // Send a DELETE request to the backend API to delete the user
    axios.delete(`/users/${userId}`) 
      .then(() => {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleUpdateUser = (updatedUser) => {
    // Send a PUT or PATCH request to the backend to update the user data
    axios.put(`/users/${updatedUser.id}`, updatedUser) // Replace with your API endpoint for updating users
      .then((response) => {
        // Handle the response, e.g., display a success message
        console.log('User updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg ml-64 mt-16">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="user-search" className="sr-only">Search</label>
        <input
          type="text"
          id="user-search"
          className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for users by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="w-full text-lg text-left text-gray-900 dark:text-gray-400 mt-4">
        <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Name
            </th>
            <th scope="col" className="p-4">
              Email
            </th>
            {/* <th scope="col" className="p-4">
              Phone
            </th>
            <th scope="col" className="p-4">
              Address
            </th> */}
           
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                {user.name}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
              {/* <td className="px-6 py-4">
                {user.phone}
              </td>
              <td className="px-6 py-4">
                {user.address}
              </td> */}
               <td className="px-6 py-4">
              <button onClick={() => handleEdit(user)} className="font-medium text-blue-600 hover:underline">Edit</button>
            </td>
              <td className="px-6 py-4">
                <button onClick={() => handleDelete(user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
       
        onUpdate={handleUpdateUser} 
      />
    </div>
  );
}

export default Users;
