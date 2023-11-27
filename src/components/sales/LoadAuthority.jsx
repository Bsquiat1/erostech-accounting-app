import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProductQuantity,deductSelectedQuantities } from '../../redux/depotSlice';
import { setInvoiceData, setCustomerName, setCustomerEmail, setCustomerPhone } from '../../redux/paymentInvoiceSlice';
import { Link } from 'react-router-dom';

const LoadAuthority = () => {
  const depots = useSelector((state) => state.depot.depots);
  const invoiceData = useSelector((state) => state.invoice.invoiceData);
  const dispatch = useDispatch();

  const [selectedDepot, setSelectedDepot] = useState(null);
  const [error, setError] = useState('');

  const handleDepotSelection = (depot) => {
    setSelectedDepot(depot);
    setError('');

  
    dispatch(setInvoiceData({ ...invoiceData }));
  };

  const handleProductQuantityChange = (depotIndex, productType, quantity) => {
    const availableQuantity = depots[depotIndex].products[productType];
    if (quantity <= availableQuantity) {
      dispatch(setProductQuantity({ depotIndex, productType, quantity }));
    } else {
      setError('Input amount exceeds available quantity.');
    }
  };
  const handleSendLoadAuthority = () => {
    if (selectedDepot) {
      const updatedProducts = { ...selectedDepot.products };
      Object.entries(updatedProducts).forEach(([productType, product]) => {
        if (product.selectedQuantity) {
          updatedProducts[productType].quantity -= product.selectedQuantity;
          updatedProducts[productType].selectedQuantity = 0;
        }
      });
  
      const updatedDepots = [...depots];
      updatedDepots[depots.indexOf(selectedDepot)].products = updatedProducts;
  
      // Here, you might dispatch an action to update the state with the deducted quantities
      // dispatch(updateDepots(updatedDepots));
      // or
      dispatch(setProductQuantity({ depotIndex: depots.indexOf(selectedDepot), products: updatedProducts }));
  
      // You can also reset the selected depot or perform other necessary actions
      setSelectedDepot(null);
    }
  };
  

  return (
    <div className="p-4 ml-64">
      <h1 className="text-3xl font-bold">Load Authority</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Selected Invoice: {invoiceData.invoiceNumber}</h2>
        <p className='text-lg'>Name:{invoiceData.customerName}</p>
        <p className='text-lg'>Email:{invoiceData.customerEmail}</p>
        <p className='text-lg'>Phone:{invoiceData.customerPhone}</p>
        <p className="text-lg">Date: {invoiceData.date.toString()}</p>

        <p className="text-lg">Subtotal: {invoiceData.subtotal}</p>

        <p className="text-lg">Total: {invoiceData.total}</p>
      </div>
      <p className="mt-4 text-lg">Select a depot for loading authority:</p>

      <div className="mt-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {depots.map((depot, index) => (
          <div
            key={index}
            className={`${
              selectedDepot === depot
                ? 'bg-blue-200 '
                : 'bg-white'
            } border border-gray-300 rounded-lg shadow-sm p-4 cursor-pointer transition-transform transform hover:scale-105`}
            onClick={() => handleDepotSelection(depot)}
          >
            <h2 className="text-xl font-semibold">{depot.name}</h2>
            <p className="text-lg">Location: {depot.location}</p>
            <p className="text-lg">Contact: {depot.contact}</p>
          </div>
        ))}
      </div>

      {selectedDepot && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Selected Depot: {selectedDepot.name}</h2>
          <p className="text-lg">Location: {selectedDepot.location}</p>
          <p className="text-lg">Contact: {selectedDepot.contact}</p>

          <h3 className="mt-4 text-xl font-semibold">Products:</h3>
<ul className="mt-2 space-y-4">
{Object.entries(selectedDepot.products).map(([productType, product]) => (
  <li key={productType} className="flex items-center space-x-4">
    <div className="flex-1">
      <div className="text-lg font-semibold">{productType}</div>
      <div className="text-gray-600">Available: {product} liters</div>
    </div>
    <div className="flex items-center">
      <input
        type="number"
        value={product.selectedQuantity}
        onChange={(e) => {
          const newQuantity = parseInt(e.target.value);
          handleProductQuantityChange(depots.indexOf(selectedDepot), productType, newQuantity);
        }}
        className="w-36 h-10 pl-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <span className="text-lg ml-2">liters</span>
    </div>
  </li>
))}
</ul>

          <Link to="/sales-invoice">
            <button
              onClick={handleSendLoadAuthority}
              className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
            >
              Send Load Authority
            </button>
          </Link>
        </div>
      )}
       {error && <p className="text-red-500">{error}</p>}

    </div>
  );
};

export default LoadAuthority;
