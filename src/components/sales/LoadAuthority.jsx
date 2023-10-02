import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoadAuthority = () => {
  const [depots, setDepots] = useState([]);
  const [selectedDepots, setSelectedDepots] = useState([]);
  const [loadingAuthorityData, setLoadingAuthorityData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of depots from your backend API
    axios.get('/loading_depots')
      .then((response) => {
        setDepots(response.data);
      })
      .catch((error) => {
        console.error('Error fetching depots:', error);
      });
  }, []);

  const handleDepotCheckboxChange = (depotId) => {
    // Toggle selected depots based on checkbox selection
    if (selectedDepots.includes(depotId)) {
      setSelectedDepots(selectedDepots.filter((id) => id !== depotId));
    } else {
      setSelectedDepots([...selectedDepots, depotId]);
    }
  };

  const handleLoadAuthority = () => {
    setLoading(true);
    setLoadingAuthorityData({}); // Clear previous data

    // Send requests to fetch loading authority data for selected depots
    Promise.all(selectedDepots.map((depotId) => (
      axios.get(`/loading-authority/${depotId}`)
    )))
      .then((responses) => {
        const authorityData = {};

        responses.forEach((response, index) => {
          const depotId = selectedDepots[index];
          authorityData[depotId] = response.data;
        });

        setLoadingAuthorityData(authorityData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching loading authority data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto mt-32 px-4">
      <h2 className="text-2xl font-bold mb-4">Send Load Authority</h2>
      <div>
        <h3 className="text-xl mb-2">Select Depots:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {depots.map((depot) => (
            <div key={depot.id} className="border p-4 rounded">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={depot.id}
                  checked={selectedDepots.includes(depot.id)}
                  onChange={() => handleDepotCheckboxChange(depot.id)}
                  className="mr-2"
                />
                {depot.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleLoadAuthority}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? 'Loading...' : 'Load Authority'}
        </button>   
      <div className="mt-4">
      <Link to="/sales-invoice">
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Go to Invoice
        </button>
      </Link>
    </div>
      </div>
      {!loading && Object.keys(loadingAuthorityData).length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl mb-2">Loading Authority Data:</h3>
          <ul>
            {Object.entries(loadingAuthorityData).map(([depotId, data]) => (
              <li key={depotId} className="mb-4">
                <h4 className="text-lg font-bold">Depot ID: {depotId}</h4>
                <pre className="bg-gray-100 p-4 rounded">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </div>
     
      )}    
      

    </div>
  );
};

export default LoadAuthority;
