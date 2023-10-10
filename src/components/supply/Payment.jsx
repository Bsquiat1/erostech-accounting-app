import React from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';


const Payment = () => {
  const invoiceData = useSelector((state) => state.supplier.invoiceData);
  const rows = useSelector((state) => state.supplier.rows);
  const total = useSelector((state) => state.supplier.total);
  

  const handleRequestPayment = () => {
    // Create a new PDF document
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text('Receipt', 20, 20);
    doc.setFontSize(12);

    // Add invoice details to the PDF
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 40);
    doc.text(`Date: ${invoiceData.date.toDateString()}`, 20, 50);
    doc.text(`Due Date: ${invoiceData.dueDate.toDateString()}`, 20, 60);
    doc.text(`Description: ${invoiceData.description}`, 20, 70);

    // Add invoice table to the PDF
    const tableData = rows.map((row, index) => [
      row.description,
      row.unitPrice,
      row.quantity,
      row.total,
    ]);
    doc.autoTable({
      head: [['Description', 'Unit Price', 'Quantity', 'Total']],
      body: tableData,
      startY: 90,
    });

    const formattedSubtotal = `${invoiceData.currency} ${invoiceData.subtotal.toFixed(2)}`;
    const formattedTax = `${invoiceData.currency} ${invoiceData.tax.toFixed(2)}`;
    const formattedTotal = `${invoiceData.currency} ${invoiceData.total.toFixed(2)}`;

    doc.text(`Subtotal: ${formattedSubtotal}`, 150, doc.autoTable.previous.finalY + 10);
    doc.text(`Tax: ${formattedTax}`, 150, doc.autoTable.previous.finalY + 20);
    doc.text(`Total: ${formattedTotal}`, 150, doc.autoTable.previous.finalY + 30);
    // Save the PDF with a unique name
    const fileName = `receipt_${invoiceData.invoiceNumber}.pdf`;
    doc.save(fileName);
  };

  const formatCurrency = (amount) => {
    if (invoiceData.currency === 'USD') {
      return `$${parseFloat(amount).toFixed(2)}`;
    } else {

      return `KSH ${parseFloat(amount).toFixed(2)}`;
    }
  };



  return (
    <div className="container mx-auto mt-24 px-4">
      <h2 className="text-3xl mb-4">Payment Details</h2>

      {/* Display invoice data */}
      <div>
        <h3 className="text-xl mb-2">Invoice Details</h3>
        <p>Invoice Number: {invoiceData.invoiceNumber}</p>
        <p>Date: {invoiceData.date.toDateString()}</p>
        <p>Due Date: {invoiceData.dueDate.toDateString()}</p>
        <p>Description: {invoiceData.description}</p>
    
      </div>

      {/* Display invoice table */}
      <div>
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
      </div>

      {/* Display invoiceData */}
      <div className="mt-4 flex justify-between">
        <div>
          <span className="font-semibold text-lg">Subtotal:</span>
          <span className='ml-1'>{`${formatCurrency(invoiceData.subtotal)}`}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Tax:</span>
          <span className='ml-1'>{`${formatCurrency(invoiceData.tax)}`}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Total:</span>
          <span className='ml-1'>{`${formatCurrency(invoiceData.total)}`}</span>
        </div>
        <button
          onClick={handleRequestPayment}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2 mr-0"
        >
          Request Payment
        </button>
        <Link to="/supply-type">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-0 ">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
