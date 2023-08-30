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

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
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
    if (selectedCurrency === 'KSH') {
      return `KSH ${amount.toFixed(2)}`;
    } else {
      return `$${amount.toFixed(2)}`;
    }
  };


  return (
    <form className="p-6 space-y-6 bg-gray-100" onSubmit={reviewInvoiceHandler}>
    <div className="bg-white p-6 rounded-md shadow-md mx-auto mx-w-md ">
      <div className="flex justify-between">
        <div>
          <span className="font-semibold text-lg">Current Date:</span>
          <span>{today}</span>
        </div>
        <div>
          <label htmlFor="invoiceNumber" className="font-semibold text-lg">
            Invoice Number:
          </label>
          <input
            required
            type="number"
            name="invoiceNumber"
            id="invoiceNumber"
            min="1"
            step="1"
            value={invoiceNumber}
            onChange={(event) => setInvoiceNumber(event.target.value)}
            className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
      <h1 className="text-2xl font-semibold mt-4">INVOICE</h1>
      
      <div className="flex space-x-4 mt-4">
        {/* <label htmlFor="cashierName" className="font-semibold text-lg">
          Cashier:
        </label>
        <input
          required
          placeholder="Cashier name"
          type="text"
          name="cashierName"
          id="cashierName"
          value={cashierName}
          onChange={(event) => setCashierName(event.target.value)}
          className="block w-full mt-1 px-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
        /> */}
        <label htmlFor="customerName" className="font-semibold text-lg">
          Customer:
        </label>
        <input
          required
          placeholder="Customer name"
          type="text"
          name="customerName"
          id="customerName"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          className="block w-base mt-1 px-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-lg">ITEM</th>
            <th className="px-4 py-2 text-lg">QTY</th>
            <th className="px-4 py-2 text-lg">PRICE</th>
            <th className="px-4 py-2 text-lg">ACTION</th>
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
              onEdtiItem={edtiItemHandler}
            />
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-lg"
        type="button"
        onClick={addItemHandler}
      >
        Add Item
      </button>
      
      <div className="mt-4 ">  
      <label htmlFor="currency" className="font-semibold text-lg ">
            Currency:
          </label>
          <select
            id="currency"
            name="currency"
            value={selectedCurrency}
            onChange={(event) => setSelectedCurrency(event.target.value)}
            className="block w-36 py-3 px-4 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="USD">USD</option>
            <option value="KSH">KSH</option>
          </select>
          <div className="flex justify-between">
  <span className="font-semibold text-lg">Subtotal:</span>
  <span>{formatCurrency(subtotal)}</span>
</div>
<div className="flex justify-between">
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

      </div>
    </div>
    
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-lg"
          type="submit"
        >
          Review Invoice
        </button>
        <InvoiceModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          invoiceInfo={{
            invoiceNumber,
            // cashierName,
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
      <div className="flex mt-4 space-x-4">
        <div>
          <label htmlFor="tax" className="font-semibold text-lg">
            Tax rate:
          </label>
          <div className="flex mt-1">
            <input
              type="number"
              name="tax"
              id="tax"
              min="0.01"
              step="0.01"
              placeholder="0.0"
              value={tax}
              onChange={(event) => setTax(event.target.value)}
              className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            />
            <span className="ml-1">%</span>
          </div>
        </div>
        <div>
          <label htmlFor="discount" className="font-semibold text-lg">
            Discount rate:
          </label>
          <div className="flex mt-1">
            <input
              type="number"
              name="discount"
              id="discount"
              min="0"
              step="0.01"
              placeholder="0.0"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
              className="py-3 px-4 block w-full border-gray-600 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-900 dark:text-gray-400"
            />
            <span className="ml-1">%</span>
          </div>
        </div>
      </div>
    </div>
  </form>
);
};


export default InvoiceForm;
