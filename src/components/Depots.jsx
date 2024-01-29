import React, { useState, useEffect } from 'react';

const Depots = () => {
  const [stations, setStations] = useState([]);
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [productType, setProductType] = useState('Diesel');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [allBalances, setAllBalances] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  useEffect(() => {
    fetch('https://erostech.jandiko.com/api/fuelDepots')
      .then((response) => response.json())
      .then((data) => {
        setStations(data.station);
        if (data.station && data.station.length > 0 && data.station[0].products) {
          setQuantity(data.station[0].products[productType] || 0);
        } else {
          setQuantity(0);
        }
      })
      .catch((error) => console.error('Error fetching stations:', error));
  }, [productType]);

  useEffect(() => {
    fetch('https://erostech.jandiko.com/api/fuelTypes')
      .then((response) => response.json())
      .then((data) => {
        setFuelTypes(data.fuel);
        setProductType(data.fuel.length > 0 ? data.fuel[0].name : '');
      })
      .catch((error) => console.error('Error fetching fuel types:', error));
  }, []);

  const handleAdjustQuantity = (amount) => {
    const currentQuantity =
      stations[selectedStationIndex]?.products?.[productType] || 0;

   
    const newQuantity = Math.max(0, Math.floor(currentQuantity + amount));

    const data = {
      depo_id: stations[selectedStationIndex].id,
      fuel_type: productType,
      quantity: newQuantity,
    };

    fetch('https://erostech.jandiko.com/api/createBalance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Create balance result:', result);
      })
      .catch((error) => {
        console.error('Error creating balance:', error);
        setError('Error creating balance. Please try again.');
      });

    setError(null);
  };

  useEffect(() => {
    fetch('https://erostech.jandiko.com/api/fetchBalances')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched all balances:', data);

        // Assuming the API response has a 'balances' property containing an array of all balances
        setAllBalances(data.balance || []);
      })
      .catch((error) => {
        console.error('Error fetching all balances:', error);
        setError('Error fetching balances. Please try again.');
      });
  }, []);

  const filteredBalances = allBalances.filter(
    (balance) =>
      balance.depo_id === stations[selectedStationIndex]?.id &&
      balance.fuel_type === productType
  );

  const handleSetQuantity = () => {
    const currentQuantity = stations[selectedStationIndex]?.products?.[productType] || 0;
    // Your setting logic here
    setError(null);
  };

  return (
    <div className="p-4 mt-8 ml-64">
      <h2 className="text-2xl font-bold mb-4">Stations</h2>

      <div className="mb-4">
        <h3 className="text-lg">Select Station:</h3>
        <select
          value={selectedStationIndex}
          onChange={(e) => setSelectedStationIndex(Number(e.target.value))}
          className="border rounded p-2"
        >
          {stations.map((station, index) => (
            <option key={station.id} value={index}>
              {station.name}
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
          {fuelTypes.map((fuel) => (
            <option key={fuel.id} value={fuel.name}>
              {fuel.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
  <h3 className="text-lg">Adjust Quantity:</h3>
  <div className="flex items-center">
    <input
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
      className="border rounded p-2 mr-2 w-20"
    />
    <button
      onClick={handleAdjustQuantity}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Adjust
    </button>
  </div>
</div>

      <div className="p-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">Balances</h2>

        {filteredBalances.length > 0 ? (
          <ul className="list-disc pl-4">
            {filteredBalances.map((balance) => (
              <li key={balance.id}>
                {/* Display balance information as needed */}
                <p>ID: {balance.id}</p>
                <p>Depot ID: {balance.depo_id}</p>
                <p>Fuel Type: {balance.fuel_type}</p>
                <p>Quantity: {balance.quantity}</p>
                <p>Created At: {balance.created_at}</p>
                <p>Updated At: {balance.updated_at}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No balances available for the selected depot and fuel type.</p>
        )}

        {error && (
          <div className="flex items-center p-4 mt-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
            {error}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg">Set Quantity:</h3>
        {/* Quantity input and set button */}
      </div>

      {error && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
          {/* Error message display */}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg">Station Information:</h3>
        <pre className="p-4 border rounded-md bg-gray-100">
          {JSON.stringify(stations[selectedStationIndex], null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Depots;
