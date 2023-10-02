import React, { useState } from 'react';

function EditInvoiceModal({ isOpen, onClose, invoice, onUpdate }) {
  const [editedInvoice, setEditedInvoice] = useState({ ...invoice });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoice({
      ...editedInvoice,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    onUpdate(editedInvoice);
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
          <div className="font-semibold text-xl mb-4">Edit Invoice</div>
          <form>
            <div className="mb-4">
              <label htmlFor="invoice_number" className="block text-gray-700 dark:text-gray-300">
                Invoice Number
              </label>
              <input
                type="text"
                id="invoice_number"
                name="invoice_number"
                value={editedInvoice.invoice_number}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={editedInvoice.amount}
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
                value={editedInvoice.is_paid}
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
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Update
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

export default EditInvoiceModal;
