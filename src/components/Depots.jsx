import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adjustProductQuantity, setProductQuantity, adjustMainLineQuantity } from '../redux/depotSlice';

const Depots = () => {
  const depots = useSelector((state) => state.depot.depots);
  const mainLine = useSelector((state) => state.depot.mainLine);
  const dispatch = useDispatch();

  const [selectedDepotIndex, setSelectedDepotIndex] = useState(0);
  const [productType, setProductType] = useState('Diesel');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedDepot = depots[selectedDepotIndex];
    if (selectedDepot && selectedDepot.products[productType] !== undefined) {
      setQuantity(selectedDepot.products[productType]);
    }
  }, [selectedDepotIndex, productType, depots]);

  const handleAdjustQuantity = (amount) => {
    const currentQuantity = depots[selectedDepotIndex].products[productType];
    
    if (mainLine[productType] >= Math.abs(amount)) {
      dispatch(adjustMainLineQuantity({ productType, amount }));
      dispatch(adjustProductQuantity({ depotIndex: selectedDepotIndex, productType, amount }));
      setError(null);
    } else {
      setError('Not enough fuel in the Main Line.');
    }
  };

  const handleSetQuantity = () => {
    if (mainLine[productType] >= quantity) {
      dispatch(adjustMainLineQuantity({ productType, amount: -quantity }));
      dispatch(setProductQuantity({ depotIndex: selectedDepotIndex, productType, quantity }));
      setError(null);
    } else {
      setError('Not enough fuel in the Main Line.');
    }
  };

  return (
    <div className="p-4 ml-64 mt-16">
      <h2 className="text-2xl font-bold mb-4">Depots</h2>
      <div className="mb-4">
        <h3 className="text-lg">Main Line:</h3>
        <pre className="p-4 border rounded-md bg-gray-100">
          {JSON.stringify(mainLine, null, 2)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="text-lg">Select Depot:</h3>
        <select
          value={selectedDepotIndex}
          onChange={(e) => setSelectedDepotIndex(Number(e.target.value))}
          className="border rounded p-2"
        >
          {depots.map((depot, index) => (
            <option key={index} value={index}>
              {depot.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="text-lg">Product Type:</h3>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="border rounded p-2"
        >
          {Object.keys(depots[selectedDepotIndex].products).map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="text-lg">Adjust Quantity:</h3>
        <button
          onClick={() => handleAdjustQuantity(-100)}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Decrease
        </button>
        <button
          onClick={() => handleAdjustQuantity(100)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
        >
          Increase
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg">Set Quantity:</h3>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <button
          onClick={handleSetQuantity}
          className="px-4 py-2 bg-green-500 text-white rounded-md ml-4"
        >
          Set
        </button>
      </div>
      {error && (
       <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
       <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
         <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
       </svg>
       <span className="sr-only">Info</span>
       <div>
         <span className="font-medium">Alert!</span> {error}
       </div>
     </div>
     
      )}
      <div className="mb-4">
        <h3 className="text-lg">Depot Information:</h3>
        <pre className="p-4 border rounded-md bg-gray-100">
          {JSON.stringify(depots[selectedDepotIndex], null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Depots;
