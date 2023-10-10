import React from 'react';

const SupplierCatalog = () => {
  // Dummy catalog data for demonstration
  const catalogData = [
    {
      id: 1,
      liters: 100,
      fuelType: 'Gasoline',
      amountPaid: 500,
      dateAndTime: '2023-09-30 14:30:00',
      location: 'Supplier Location 1',
    },
    {
      id: 2,
      liters: 150,
      fuelType: 'Diesel',
      amountPaid: 700,
      dateAndTime: '2023-09-29 10:00:00',
      location: 'Supplier Location 2',
    },
    // Add more catalog data as needed
  ];

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl mb-4">Supplier Catalog</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Liters</th>
            <th>Fuel Type</th>
            <th>Amount Paid</th>
            <th>Date and Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {catalogData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.liters}</td>
              <td>{entry.fuelType}</td>
              <td>{entry.amountPaid}</td>
              <td>{entry.dateAndTime}</td>
              <td>{entry.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierCatalog
