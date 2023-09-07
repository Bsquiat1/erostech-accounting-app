import React, { useState } from 'react';
import Modal from 'react-modal';

const EditUserModal = ({ user, isOpen, onClose, onSave, onUpdate }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit User Modal"
      className="bg-white rounded-lg shadow-md w-80 p-4 mx-auto mt-20"
      overlayClassName="fixed inset-0 flex items-center justify-center z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form>
      <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
      Name:
    </label>
    <input
      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      name="name"
      value={editedUser.name}
      onChange={handleInputChange}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
      Email:
    </label>
    <input
      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="email"
      name="email"  
      value={editedUser.email} 
      onChange={handleInputChange}
    />
  </div>
        {/* Add input fields for other user attributes (email, phone, address) */}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
