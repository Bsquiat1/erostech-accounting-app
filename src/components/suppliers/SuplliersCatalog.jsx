import React, { useState } from 'react';

const SupplierCatalog = () => {
  const [catalog, setCatalog] = useState([]);
  const [newEntry, setNewEntry] = useState({
    liters: '',
    fuelType: '',
    amountPaid: '',
    dateAndTime: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevNewEntry) => ({ ...prevNewEntry, [name]: value }));
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

  return (
    <div>
      <h2>Supplier Catalog</h2>
      <div>
        <input
          type="text"
          name="liters"
          placeholder="Liters"
          value={newEntry.liters}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={newEntry.fuelType}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="amountPaid"
          placeholder="Amount Paid"
          value={newEntry.amountPaid}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="dateAndTime"
          placeholder="Date and Time"
          value={newEntry.dateAndTime}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEntry.location}
          onChange={handleInputChange}
        />
        <button onClick={addCatalogEntry}>Add Entry</button>
      </div>
      <ul>
        {catalog.map((entry, index) => (
          <li key={index}>
            Liters: {entry.liters}, Fuel Type: {entry.fuelType}, Amount Paid: {entry.amountPaid},{' '}
            Date and Time: {entry.dateAndTime}, Location: {entry.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierCatalog;
