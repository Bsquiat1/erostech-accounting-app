import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from './helpers/incrementString';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const editItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((item) => {
      if (item.id === editedItem.id) {
        return { ...item, [editedItem.name]: editedItem.value };
      }
      return item;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  const formatCurrency = (amount) => {
    // Parse 'amount' as a float
    const amountAsFloat = parseFloat(amount);
  
    if (selectedCurrency === 'KSH') {
      return `KSH ${amountAsFloat.toFixed(2)}`;
    } else {
      return `$${amountAsFloat.toFixed(2)}`;
    }
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };


  return (
    <div className="flex items-center h-screen ml-64">
      <div
        className="p-6 space-y-6 bg-white rounded-md shadow-lg mt-64"
        style={{ width: '19.27in', height: '12.69in' }} 
      >
        <h1 className="text-2xl font-semibold text-center mb-4">INVOICE FORM</h1>
        <div className="flex justify-between">
          <div className="w-1/2">
            <span className="font-semibold">Invoice Number:</span>
            <span>{invoiceNumber}</span>
          </div>
          <div className="w-1/2 text-right">
            <span className="font-semibold">Invoice Date:</span>
            <span>{today}</span>
          </div>
        </div>

        <div className="mt-4">
          <span className="font-semibold">Customer:</span>
          <input
            required
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="w-full mt-2 px-2 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEditItem={editItemHandler} 
              />
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="button"
            onClick={addItemHandler}
          >
            Add Item
          </button>
        </div>

        <div className="flex justify-between">
          
          <div>
            <label htmlFor="tax" className="font-semibold">Tax Rate:</label>
            <div className="mt-1 flex">
            <input
  type="number"
  name="tax"
  id="tax"
  min="0.01"
  step="0.01"
  placeholder="0.0"
  value={tax} 
  onChange={(event) => setTax(event.target.value)}
  className="w-16 px-2 py-1 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
/>

              <span className="ml-2">%</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
  <label htmlFor="currency" className="font-semibold text-lg">
    Select Currency:
  </label>
  <select
    id="currency"
    name="currency"
    value={selectedCurrency}
    onChange={handleCurrencyChange}
    className="w-32 px-2 py-1 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  >
    <option value="KSH">KSH</option>
    <option value="USD">USD</option>
  </select>
</div>


          <div>
            <label htmlFor="discount" className="font-semibold">Discount Rate:</label>
            <div className="mt-1 flex">
              <input
                type="number"
                name="discount"
                id="discount"
                min="0"
                step="0.01"
                placeholder="0.0"
                value={discount}
                onChange={(event) => setDiscount(event.target.value)}
                className="w-16 px-2 py-1 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <span className="ml-2">%</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-lg ">Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between ">
          <span className="font-semibold text-lg">Discount:</span>
          <span>({discount || '0'}%){formatCurrency(discountRate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-lg">Tax:</span>
          <span>({tax || '0'}%){formatCurrency(taxRate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-lg">Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit"
            onClick={reviewInvoiceHandler}
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
