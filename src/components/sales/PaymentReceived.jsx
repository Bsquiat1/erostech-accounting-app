import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTotal } from '../../redux/invoiceSlice';
import { Link } from 'react-router-dom';

const PaymentReceived = () => {
  const total = useSelector((state) => state.invoice.total);
  const dispatch = useDispatch();

  const handlePaymentReceived = () => {
    // Handle payment received logic here
    // For this example, we'll just log a message and reset the total
    console.log('Payment received!');

    // Reset the total in the Redux store
    dispatch(setTotal(0));
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-xl rounded-lg mt-64">
      <h2 className="text-2xl font-semibold mb-4">Payment Received?</h2>
      <p className="text-xl font-bold text-green-500 mb-8">Total Amount: ${total}</p>
      <Link to="/load-authority"><button
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 focus:outline-none"
        onClick={handlePaymentReceived}
      >
        Payment Received
      </button></Link>
    </div>
  );
};

export default PaymentReceived;
