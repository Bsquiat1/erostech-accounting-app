import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Confirm Order</h2>
        <p>Are you sure you want to confirm this order?</p>
        <div className="flex justify-end mt-6"> 
        <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          
          
          <Link to="/payment-received"><button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button></Link>
         
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
