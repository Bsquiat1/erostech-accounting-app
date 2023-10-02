import React, { useState } from 'react';

function AddInvoiceModal({ isOpen, onClose, onSave }) {
  const [newInvoice, setNewInvoice] = useState({
    invoice_number: '',
    bill_amount: '',
    amount_paid: '',
    billing_date: '',
    due_date: '',
    is_paid: 'false',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({
      ...newInvoice,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(newInvoice);
    setNewInvoice({
      invoice_number: '',
      bill_amount: '',
      amount_paid: '',
      billing_date: '',
      due_date: '',
      is_paid: 'false',
    });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ${
        isOpen ? 'visible' : 'invisible'
      }`}
    >
      {/* Add your modal content here */}
      <div className="relative w-auto max-w-md mx-auto my-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg relative flex flex-col w-full p-8">
          <div className="font-semibold text-xl mb-4">Add Invoice</div>
          <form>
            <div className="mb-4">
              <label htmlFor="invoice_number" className="block text-gray-700 dark:text-gray-300">
                Invoice Number
              </label>
              <input
                type="text"
                id="invoice_number"
                name="invoice_number"
                value={newInvoice.invoice_number}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bill_amount" className="block text-gray-700 dark:text-gray-300">
                Bill Amount
              </label>
              <input
                type="text"
                id="bill_amount"
                name="bill_amount"
                value={newInvoice.bill_amount}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount_paid" className="block text-gray-700 dark:text-gray-300">
                Amount Paid
              </label>
              <input
                type="text"
                id="amount_paid"
                name="amount_paid"
                value={newInvoice.amount_paid}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="billing_date" className="block text-gray-700 dark:text-gray-300">
                Billing Date
              </label>
              <input
                type="date"
                id="billing_date"
                name="billing_date"
                value={newInvoice.billing_date}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="due_date" className="block text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={newInvoice.due_date}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="is_paid" className="block text-gray-700 dark:text-gray-300">
                Is Paid
              </label>
              <select
                id="is_paid"
                name="is_paid"
                value={newInvoice.is_paid}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg w-full"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </form>
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInvoiceModal;
