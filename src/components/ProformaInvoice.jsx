import React, { useState } from 'react';

const ProformaInvoice = ({ customerInfo, onNextStep }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handleNext = () => {
    // Call the provided onNextStep callback to move to the next step
    onNextStep();
  };

  return (
    <div>
      <h2>Proforma Invoice</h2>
      <div>
        <p>Customer Name: {customerInfo.customerName}</p>
        <p>Customer Email: {customerInfo.customerEmail}</p>
      </div>
      {confirmed ? (
        <p>Order Confirmed!</p>
      ) : (
        <button type="button" onClick={handleConfirm}>
          Confirm Order
        </button>
      )}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default ProformaInvoice;
