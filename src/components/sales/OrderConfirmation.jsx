import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCustomerData } from '../../redux/customerSlice';
import { Link } from 'react-router-dom';
import OrderConfirmationModal from './OrderConfirmationModal';

const OrderConfirmation = () => {

  const customerName = useSelector((state) => state.customer.name);
  const customerPhone = useSelector((state) => state.customer.phone);
  const customerEmail = useSelector((state) => state.customer.email);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoiceData = useSelector((state) => state.invoice.invoiceData);
  const rows = useSelector((state) => state.invoice.rows);

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-24 px-4">
      <h2 className="text-3xl mb-4">Order Confirmation</h2>

      <div className="mb-4">
        <strong>Customer Name:</strong> {customerName}
      </div>

      <div className="mb-4">
        <strong>Customer Email:</strong> {customerEmail}
      </div>

      <div className="mb-4">
        <strong>Customer Phone:</strong> {customerPhone}
      </div>

      <div className="mb-4">
        <strong>Invoice Number:</strong> {invoiceData.invoiceNumber}
      </div>
      <div className="mb-4">
        <strong>Date:</strong> {new Date(invoiceData.date).toLocaleDateString()}
      </div>

      <div className="mb-4">
        <strong>Due Date:</strong> {new Date(invoiceData.dueDate).toLocaleDateString()}
      </div>
      <h3 className="text-xl mb-2">Invoice Table</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Unit Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.description}</td>
              <td>{row.unitPrice}</td>
              <td>{row.quantity}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <strong>Subtotal:</strong> ${invoiceData.subtotal}
      </div>

      <div className="mt-2">
        <strong>Tax:</strong> ${invoiceData.tax}
      </div>

      <div className="mt-2">
        <strong>Total:</strong> ${invoiceData.total}
      </div>
     
      <div className="mt-4 flex justify-between">
        <Link to="/customer-enquiry">
          <button className="bg-red-500 text-white px-4 py-2 rounded">Deny</button>
        </Link>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>

      </div>

      {isModalOpen && (
        <OrderConfirmationModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {}}
        />
      )}
    </div>
  );
};

export default OrderConfirmation;
