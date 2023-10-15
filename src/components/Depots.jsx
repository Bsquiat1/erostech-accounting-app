import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustProductQuantity, setProductQuantity } from '../redux/depotSlice';

const Depots = () => {
  const dispatch = useDispatch();
  const depots = useSelector((state) => state.depot.depots);

  const handleAdjust = (depotIndex, productType, amount) => {
    dispatch(adjustProductQuantity({ depotIndex, productType, amount }));
  };

  const handleSetQuantity = (depotIndex, productType, quantity) => {
    dispatch(setProductQuantity({ depotIndex, productType, quantity }));
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl mb-4 text-gray-800">Depot Details</h2>

      {depots.map((depot, depotIndex) => (
        <div key={depotIndex} className="border p-6 mb-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl mb-2 text-blue-700">{depot.name}</h3>
          <p className="text-gray-700"><strong>Location:</strong> {depot.location}</p>
          <p className="text-gray-700"><strong>Contact:</strong> {depot.contact}</p>

          <div className="mt-4">
            <h4 className="text-lg mb-2 text-black-700">Product Quantities (in Liters):</h4>
            <ul>
              {Object.entries(depot.products).map(([productType, quantity]) => (
                <li key={productType} className="flex items-center justify-between mb-2">
                  <span className="mr-2">{productType}:</span>
                  <div className='flex'><button
                    onClick={() => handleAdjust(depotIndex, productType, -500)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min="0"
                    onChange={(e) => handleSetQuantity(depotIndex, productType, parseInt(e.target.value, 10))}
                    className="border rounded px-2 py-1 w-40 text-center"
                  />
                  <button
                    onClick={() => handleAdjust(depotIndex, productType, 500)}
                    className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
                  >
                    +
                  </button></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Depots;
