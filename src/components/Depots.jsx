import React, { useState, useEffect } from 'react';
import '../styles/depots.scss';

const Depots = () => {
  const [stations, setStations] = useState([]);
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [productType, setProductType] = useState('Diesel');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [allBalances, setAllBalances] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/fuelDepots')
       .then((response) => response.json())
       .then((data) => {
         setStations(data.station);
       })
       .catch((error) => console.error('Error fetching stations:', error));
   }, []);
   

   useEffect(() => {
    fetch('http://127.0.0.1:8000/api/fuelTypes')
       .then((response) => response.json())
       .then((data) => {
         setFuelTypes(data.fuel);
       })
       .catch((error) => console.error('Error fetching fuel types:', error));
   }, []);
   
   useEffect(() => {
    fetch('http://127.0.0.1:8000/api/fetchBalances')
       .then((response) => response.json())
       .then((data) => {
         setAllBalances(data.balance || []);
       })
       .catch((error) => {
         setError('Error fetching balances. Please try again.');
       });
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
    <div className="p-4 mt-8 ml-64 body">
      <h2 className="text-2xl font-bold mb-4 title">Stations</h2>

      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Super</th>
          <th scope="col">Petrol</th>
          <th scope="col">Diesel</th>
          <th scope="col">Set Balance</th>
          <th scope="col">Fuel In/Out</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((station, index) => {
          // Find the corresponding balance for this station
          const balance = allBalances.find(
            (balance) => balance.depo_id === station.id
          );

          // Get the fuel type name for this balance
          const fuelTypeName = fuelTypes.find(
            (fuelType) => fuelType.id === balance?.fuel_type
          )?.name;

          // Extract the quantity for the balance
          const quantity = balance?.quantity || 0;

          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{station.name}</td>
              <td>{station.location}</td>
              <td>{fuelTypeName === 'Super' ? quantity : 0}</td>
              <td>{fuelTypeName === 'Diesel' ? quantity : 0}</td>
              <td>{fuelTypeName === 'Kerosene' ? quantity : 0}</td>
              <td><i class="fa-solid fa-gas-pump"></i></td>
              <td><i class="fa-solid fa-gear"></i></td>
            </tr>
          );
        })}
      </tbody>
      </table>


        
    </div>
  );
};

export default Depots;
