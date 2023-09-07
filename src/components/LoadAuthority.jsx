import React, { useState } from 'react';

const LoadAuthority = ({ customerInfo, onLoadAuthorityGenerated }) => {
  const [loadAuthorityGenerated, setLoadAuthorityGenerated] = useState(false);

  const handleGenerateLoadAuthority = () => {
    // Perform load authority generation logic (e.g., call an API)
    setLoadAuthorityGenerated(true);
  };

  const handleNext = () => {
    // Call the provided onLoadAuthorityGenerated callback to move to the next step
    onLoadAuthorityGenerated();
  };

  return (
    <div>
      <h2>Load Authority Generation</h2>
      <div>
        <p>Customer Name: {customerInfo.customerName}</p>
        <p>Customer Email: {customerInfo.customerEmail}</p>
      </div>
      {loadAuthorityGenerated ? (
        <p>Load Authority Generated!</p>
      ) : (
        <button type="button" onClick={handleGenerateLoadAuthority}>
          Generate Load Authority
        </button>
      )}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default LoadAuthority;
