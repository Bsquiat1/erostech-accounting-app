import React from 'react';
import { useSelector } from 'react-redux';
import { selectCustomerData } from '../../redux/customerSlice';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import OrderConfirmationModal from './OrderConfirmationModal'

const OrderConfirmation = () => {
  const customer = useSelector(selectCustomerData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const invoiceData = {
    invoiceNumber: 'INV123', // Assuming you have the invoice number
    date: '2023-09-30', // Sample date format
    dueDate: '2023-10-15', // Sample due date format
    rows: [
      { description: 'Product A', unitPrice: 10, quantity: 2, total: 20 },
      { description: 'Product B', unitPrice: 15, quantity: 1, total: 15 },
      // ... more rows
    ],
    totals: {
      subtotal: 35, // Sample subtotal
      tax: 5, // Sample tax
      total: 40, // Sample total
    },
  };


  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };


  return (
    <div className="container mx-auto mt-24 px-4">
      <h2 className="text-3xl mb-4">Order Confirmation</h2>

      <div className="mb-4">
        <strong>Customer Name:</strong> {customer.name}
      </div>

      <div className="mb-4">
        <strong>Customer Email:</strong> {customer.email}
      </div>

      <div className="mb-4">
        <strong>Customer Phone:</strong> {customer.phone}
      </div>

      <div className="mb-4">
        <strong>Invoice Number:</strong> {invoiceData.invoiceNumber}
      </div>

      <div className="mb-4">
        <strong>Date:</strong> {invoiceData.date}
      </div>

      <div className="mb-4">
        <strong>Due Date:</strong> {invoiceData.dueDate}
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
          {invoiceData.rows.map((row, index) => (
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
        <strong>Subtotal:</strong> ${invoiceData.totals.subtotal}
      </div>

      <div className="mt-2">
        <strong>Tax:</strong> ${invoiceData.totals.tax}
      </div>

      <div className="mt-2">
        <strong>Total:</strong> ${invoiceData.totals.total}
      </div>
     
      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>

        <Link to="/customer-enquiry">
          <button className="bg-red-500 text-white px-4 py-2 rounded">Deny</button>
        </Link>
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
