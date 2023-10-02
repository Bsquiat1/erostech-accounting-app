import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCustomerData } from '../../redux/customerSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  setInvoiceData, 
  selectInvoiceData,
  setSubtotal,
  setTax,
  setTotal
} from '../../redux/invoiceSlice';

const ProformaInvoice = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentDate = new Date();
  const customer = useSelector(selectCustomerData);
  const dispatch = useDispatch();
  const invoiceData = useSelector(selectInvoiceData);


  const [proformaInvoiceData, setProformaInvoiceData] = useState({
    invoiceNumber: '',
    date: currentDate,
  
   
    billingDate: currentDate,
    dueDate: currentDate,
    description: '',
    unitPrice: '',
    quantity: '',
    total: '',
  });

  const [rows, setRows] = useState([
    { description: '', unitPrice: '', quantity: '', total: '' },
  ]);

  useEffect(() => {
    const fetchNextInvoiceNumber = async () => {
      try {
        const response = await fetch('/invoices');
        const data = await response.json();
        setProformaInvoiceData((prevData) => ({
          ...prevData,
          invoiceNumber: data.nextInvoiceNumber,
        }));
      } catch (error) {
        console.error('Error fetching next invoice number:', error);
      }
    };

    fetchNextInvoiceNumber();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProformaInvoiceData({ ...proformaInvoiceData, [name]: value });
  };

  const handleDueDateChange = (date) => {
    setProformaInvoiceData({ ...proformaInvoiceData, dueDate: date });
  };

  const handleSendEmail = () => {
   
    alert('Email sent successfully!');
  };

 
  const handleGeneratePDF = () => {
  
    const doc = new jsPDF();
  
 
    doc.setFont('helvetica');
    doc.setFontSize(16);
  
 
    doc.text('Proforma Invoice', 20, 20);
  
 
    doc.setFontSize(10);

    doc.text(`Invoice Number: ${proformaInvoiceData.invoiceNumber}`, 20, 40);
    doc.text(`Date: ${proformaInvoiceData.date.toDateString()}`, 20, 50);
    doc.text(`Due Date: ${proformaInvoiceData.dueDate.toDateString()}`, 20, 60);
    doc.text(`Customer Name: ${customer.name}`, 20, 70);
    doc.text(`Customer Email: ${customer.email}`, 20, 80);
    doc.text(`Customer Phone: ${customer.phone}`, 20, 90);
  
  
    doc.setFontSize(14);
  
 
    const columns = ['Description', 'Unit Price', 'Quantity', 'Total'];
  
  
    const tableData = rows.map((row) => [
      row.description,
      row.unitPrice,
      row.quantity,
      row.total,

     
    ]);
  
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 100,
    });
  
    // Calculate and add total amount
    const totalAmount = rows.reduce(
      (sum, row) => sum + parseFloat(row.total || 0),
      0
    );
    doc.text(
      `Subtotal: ${formatCurrency(totals.subtotal)}`,
      150,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `Tax: ${formatCurrency(totals.tax)}`,
      150,
      doc.autoTable.previous.finalY + 20
    );
    doc.text(
      `Total: ${formatCurrency(totals.total)}`,
      150,
      doc.autoTable.previous.finalY + 30
    );
    
  
    // Save the PDF
    doc.save('proforma_invoice.pdf');

    dispatch(setInvoiceData(proformaInvoiceData));
   

  };

 
  

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { description: '', unitPrice: '', quantity: '', total: '' }]);
  };

  const handleTableRowChange = (index, fieldName, value) => {
    const updatedRows = [...rows];
    updatedRows[index][fieldName] = value;
  
    // Calculate row total if unit price or quantity is changed
    if (fieldName === 'unitPrice' || fieldName === 'quantity') {
      const unitPrice = parseFloat(value) || 0;
      const quantity = parseFloat(updatedRows[index]['quantity']) || 0;
      updatedRows[index]['total'] = (unitPrice * quantity).toFixed(2);
    }
  
    // Update invoiceData based on the updated rows
    const { description, unitPrice, quantity, total } = updatedRows[index];
    setProformaInvoiceData((prevData) => ({
      ...prevData,
      description,
      unitPrice,
      quantity,
      total,
    }));
  
    setRows(updatedRows);
  };
  
  
  const calculateTotals = () => {
    let subtotal = 0;

    rows.forEach((row) => {
      const total = parseFloat(row.unitPrice) * parseFloat(row.quantity);
      subtotal += total;
    });

    const tax = subtotal * 0.16; 
    const total = subtotal + tax;

    dispatch(setSubtotal(subtotal));
    dispatch(setTax(tax));
    dispatch(setTotal(total));

    return { subtotal, tax, total };
  };

  const [totals, setTotals] = useState(calculateTotals());

  useEffect(() => {
  
    setTotals(calculateTotals());
  }, [rows]);

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
  };



  return (
    <div className="container mx-auto mt-24 px-4">
      <h2 className="text-3xl mb-4">Proforma Invoice</h2>
        {customer && customer.name && (
        <div className="mb-4 flex justify-between">
          <div>
            <label htmlFor="invoiceNumber" className="block mb-1">
              Invoice Number:
            </label>
            <input
              type="number"
              id="invoiceNumber"
              name="invoiceNumber"
              value={proformaInvoiceData.invoiceNumber}
              onChange={handleInputChange}
              className="w-max border rounded p-2"
            />
          </div>
          <div className="flex">
            <div className="mb-4 mr-2">
              <label htmlFor="date" className="block mb-1">
                Date:
              </label>
              <DatePicker
                selected={proformaInvoiceData.date}
                onChange={handleDueDateChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="billingDate" className="block mb-1">
                Due Date:
              </label>
              <DatePicker
                selected={proformaInvoiceData.dueDate}
                onChange={handleDueDateChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold">Customer Name:</span>
            <span className="ml-2">{customer.name}</span>
          </div>
        </div>
      )}


      {/* <div className="mb-4">
        <label htmlFor="amount" className="block mb-1">
          Amount:
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={proformaInvoiceData.amount}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
      </div> */}
      {/* <div className="mb-4">
        <label htmlFor="billAmount" className="block mb-1">
          Bill Amount:
        </label>
        <input
          type="text"
          id="billAmount"
          name="billAmount"
          value={proformaInvoiceData.billAmount}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
      </div> */}
      {/* <div className="mb-4">
        <label htmlFor="amountPaid" className="block mb-1">
          Amount Paid:
        </label>
        <input
          type="text"
          id="amountPaid"
          name="amountPaid"
          value={proformaInvoiceData.amountPaid}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
      </div> */}
     

      {/* Invoice Table */}
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
    <td>
      <input
        type="text"
        value={row.description}
        onChange={(e) =>
          handleTableRowChange(index, 'description', e.target.value)
        }
        className="w-full px-2 py-1 border rounded"
      />
    </td>
    <td>
      <input
        type="number"
        value={row.unitPrice}
        onChange={(e) =>
          handleTableRowChange(index, 'unitPrice', e.target.value)
        }
        className="w-full px-2 py-1 border rounded"
      />
    </td>
    <td>
      <input
        type="number"
        value={row.quantity}
        onChange={(e) =>
          handleTableRowChange(index, 'quantity', e.target.value)
        }
        className="w-full px-2 py-1 border rounded"
      />
    </td>
    <td>
      <input
        type="number"
        value={row.total}
        onChange={(e) =>
          handleTableRowChange(index, 'total', e.target.value)
        }
        className="w-full px-2 py-1 border rounded"
      />
    </td>
    <td>
  <button
    onClick={() => deleteRow(index)}
    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
  >
    <svg
      className="w-4 h-4 mr-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
      />
    </svg>
 
  </button>
</td>

  </tr>
))}

</tbody>

      </table>
      <button
        onClick={addRow}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Row
      </button>
      <div className="mt-4 flex justify-between">
        <div>
          <span className="font-semibold text-lg">Subtotal:</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Tax:</span>
          <span>{formatCurrency(totals.tax)}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Total:</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-4 flex justify-between">
      <Link to="/order-confirmation">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Next
        </button>
      </Link>

      <button
        onClick={handleSendEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
      >
        Send Email
      </button>

      <button
        onClick={handleGeneratePDF}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4"
      >
        Generate PDF
      </button>
      </div>
    </div>
  );
};

export default ProformaInvoice;
