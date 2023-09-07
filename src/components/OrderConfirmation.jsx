import React, { useState } from 'react';

const OrderConfirmation = ({ customerInfo, onConfirmOrder }) => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handlePaymentConfirm = () => {
    // Perform payment confirmation logic (e.g., call an API)
    setPaymentConfirmed(true);
  };

  const handleNext = () => {
    // Call the provided onConfirmOrder callback to move to the next step
    onConfirmOrder();
  };

  return (
    <div>
      <h2>Order Confirmation</h2>
      <div>
        <p>Customer Name: {customerInfo.customerName}</p>
        <p>Customer Email: {customerInfo.customerEmail}</p>
      </div>
      {paymentConfirmed ? (
        <p>Payment Confirmed!</p>
      ) : (
        <button type="button" onClick={handlePaymentConfirm}>
          Confirm Payment
        </button>
      )}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default OrderConfirmation;
