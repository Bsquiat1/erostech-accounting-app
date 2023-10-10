import React, { useState } from 'react';
import Pagination from '../company/Pagination'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Supplier 1', isActive: true },
    { id: 2, name: 'Supplier 2', isActive: false },
    // Add more sample suppliers as needed
  ]);

  const [catalog, setCatalog] = useState([]);
  const [newEntry, setNewEntry] = useState({
    liters: '',
    fuelType: '',
    amountPaid: '',
    dateAndTime: '',
    location: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleSupplierStatus = (id) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, isActive: !supplier.isActive } : supplier
      )
    );
  };

  const addCatalogEntry = () => {
    setCatalog((prevCatalog) => [...prevCatalog, newEntry]);
    setNewEntry({
      liters: '',
      fuelType: '',
      amountPaid: '',
      dateAndTime: '',
      location: '',
    });
  };

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastSupplier = currentPage * itemsPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg ml-64 mt-20">
      {/* ... Other code ... */}

      <table className="w-full text-lg text-left text-gray-900 dark:text-gray-400 mt-4">
        <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Supplier Name
            </th>
            <th scope="col" className="p-4">
              Status
            </th>
            <th scope="col" className="p-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentSuppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={() => handleSupplierClick(supplier)}
              style={{ cursor: 'pointer' }}
            >
              <td className="px-6 py-4">{supplier.name}</td>
              <td className="px-6 py-4">
                {supplier.isActive ? 'Active' : 'Inactive'}
              </td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit Supplier', supplier);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Delete Supplier', supplier);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredSuppliers.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Supplier Catalog */}
      {/* ... Other code ... */}

      {/* Modal for displaying supplier info */}
      {isModalOpen && selectedSupplier && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Supplier Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close"
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              <p>
                <strong>ID:</strong> {selectedSupplier.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedSupplier.name}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {selectedSupplier.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
