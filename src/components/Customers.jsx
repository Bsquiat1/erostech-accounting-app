import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch customers from the backend API when the component mounts
    axios.get('/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (customerId) => {
    // Send a DELETE request to the backend API to delete the customer
    axios.delete(`/customers/${customerId}`) 
      .then(() => {
        
        setCustomers(customers.filter((customer) => customer.id !== customerId));
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg ml-64 mt-16">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="customer-search" className="sr-only">Search</label>
        <input
          type="text"
          id="customer-search"
          className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for customers by name"
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
            <th scope="col" className="p-4">
              Phone
            </th>
            <th scope="col" className="p-4">
              Address
            </th>
            <th scope="col" className="p-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                {customer.name}
              </td>
              <td className="px-6 py-4">
                {customer.email}
              </td>
              <td className="px-6 py-4">
                {customer.phone}
              </td>
              <td className="px-6 py-4">
                {customer.address}
              </td>
              <button onClick={() => handleDelete(customer.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
  </svg>
</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
