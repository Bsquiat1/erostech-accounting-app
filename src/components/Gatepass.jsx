import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GatePassForm = () => {
  const [selectedDepot, setSelectedDepot] = useState('');
  const [product_type, setProduct_type] = useState('');
  const [quantity_leaving, setQuantity_leaving] = useState(0);
  const [destination, setDestination] = useState('');
  const [vehicle_details, setVehicle_details] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [user_id, setUser_id] = useState('');
  const [issued_at, setIssuedAt] = useState('');
  const [issued_by, setIssuedBy] = useState('');
  const [warning, setWarning] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/gatepasses', {
      issued_at: new Date(),
      issued_by,
      depot: selectedDepot,
      product_type,
      quantity_leaving: parseInt(quantity_leaving), // Ensure it's a number
      destination,
      vehicle_details,
      user_id,
    })
    .then(response => {
      setSuccessMessage('Gate pass created successfully!');
      setError(null);
      // Reset form fields if needed
      setSelectedDepot('');
      setProduct_type('');
      setQuantity_leaving(0);
      setDestination('');
      setVehicle_details('');
      setUser_id('');
      setIssuedAt('');
      setIssuedBy('');
    })
    .catch(error => {
      setError('Failed to create gate pass. Please check your inputs.');
      setSuccessMessage('');
      console.error('Error creating gate pass:', error);
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setIssuedAt(getCurrentDate());
  }, []);

  useEffect(() => {
    axios.get('/member_details')
      .then(response => {
        const currentUser = response.data;
        if (currentUser) {
          setIssuedBy(currentUser.name);
          setUser_id(currentUser.id);
        }
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Gate Pass</h2>
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {warning && (
        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-lg">
          {warning}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Issued At:</label>
            <input
              type="date"
              value={issued_at}
              onChange={(e) => setIssuedAt(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Issued By:</label>
            <input
              type="text"
              value={issued_by}
              onChange={(e) => setIssuedBy(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <input type="hidden" value={user_id} />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Depot:</label>
            <input
              type="text"
              value={selectedDepot}
              onChange={(e) => setSelectedDepot(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Type:</label>
            <input
              type="text"
              value={product_type}
              onChange={(e) => setProduct_type(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity Leaving:</label>
            <input
              type="number"
              value={quantity_leaving}
              onChange={(e) => setQuantity_leaving(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Vehicle Details:</label>
            <input
              type="text"
              value={vehicle_details}
              onChange={(e) => setVehicle_details(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Generate Gate Pass
          </button>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default GatePassForm;
