import React, { useState } from 'react';

const PaymentReceived = ({ customerInfo, onPaymentReceived }) => {
  const [paymentReceived, setPaymentReceived] = useState(false);

  const handlePaymentReceived = () => {
    // Perform payment received logic (e.g., call an API)
    setPaymentReceived(true);
  };

  const handleNext = () => {
    // Call the provided onPaymentReceived callback to move to the next step
    onPaymentReceived();
  };

  return (
    <div>
      <h2>Payment Received</h2>
      <div>
        <p>Customer Name: {customerInfo.customerName}</p>
        <p>Customer Email: {customerInfo.customerEmail}</p>
      </div>
      {paymentReceived ? (
        <p>Payment Received and Confirmed!</p>
      ) : (
        <button type="button" onClick={handlePaymentReceived}>
          Mark Payment as Received
        </button>
      )}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default PaymentReceived;
