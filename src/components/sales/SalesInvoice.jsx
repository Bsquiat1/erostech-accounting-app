import React from 'react';
import { useSelector } from 'react-redux';

const SalesInvoice = () => {
  const customer = useSelector((state) => state.customer);
  const invoice = useSelector((state) => state.invoice.invoiceData);
  const rows = useSelector((state) => state.invoice.rows);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSaveButtonClick = () => {
    // Create a jsPDF instance
    const pdf = new jsPDF();

    // Generate the content for the PDF
    const content = `
      Invoice Number: ${invoice.invoiceNumber}
      Date: ${formatDate(invoice.date)}
      Due Date: ${formatDate(invoice.dueDate)}
      
      Billed To:
      ${customer.name}
      ${customer.email}
      ${customer.phone}
      
      Invoice Summary:
      Subtotal: ${invoice.subtotal} ${invoice.currency}
      Tax: ${invoice.tax} ${invoice.currency}
      Total: ${invoice.total} ${invoice.currency}
    `;

    // Set font size and add the content to the PDF
    pdf.setFontSize(12);
    pdf.text(content, 10, 10);

    // Save the PDF
    pdf.save('invoice.pdf');
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="w-8/12 bg-white shadow-lg p-6">
      
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-widest text-indigo-500">
              {customer.name}
            </h1>
            <p className="text-base">{customer.email}</p>
            <p className="text-base">{customer.phone}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">
              Save
            </button>
            <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">
              Print
            </button>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-800 my-4"></div>
        <div className="flex justify-between">
          <div>
            <h6 className="font-bold">
              Invoice Number :{' '}
              <span className="text-sm font-medium">{invoice.invoiceNumber}</span>
            </h6>
            <h6 className="font-bold">
              Invoice Date :{' '}
              <span className="text-sm font-medium">
                {formatDate(invoice.date)}
              </span>
            </h6>
            <h6 className="font-bold">
              Due Date :{' '}
              <span className="text-sm font-medium">
                {formatDate(invoice.dueDate)}
              </span>
            </h6>
          </div>
          <div className="w-40">
            <address className="text-sm">
              <span className="font-bold">Billed To :</span>
              <br />
              {customer.name}
              <br />
              {customer.email}
              <br />
              {customer.phone}
            </address>
          </div>
          <div className="w-40">
            <address className="text-sm">
              <span className="font-bold">Ship To :</span>
              <br />
              {/* Add ship to information if available */}
            </address>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <div className="border-b border-gray-200 shadow w-full">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{row.description}</td>
                    <td className="px-4 py-2">{row.unitPrice}</td>
                    <td className="px-4 py-2">{row.quantity}</td>
                    <td className="px-4 py-2">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl">Invoice Summary :</h3>
            <h6 className="font-bold">
              Subtotal : <span className="text-sm font-medium">{invoice.subtotal} {invoice.currency}</span>
            </h6>
            <h6 className="font-bold">
              Tax : <span className="text-sm font-medium">{invoice.tax} {invoice.currency}</span>
            </h6>
            <h6 className="font-bold">
              Total : <span className="text-sm font-medium">{invoice.total} {invoice.currency}</span>
            </h6>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-800 my-4"></div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            Thank you very much for doing business with us.
          </div>
          <div className="flex items-end justify-end space-x-3">
            <button className="px-4 py-2 text-sm text-green-600 bg-green-100">Print</button>
            <button
            onClick={handleSaveButtonClick}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-400"
          >
            Save as PDF
          </button>
            <button className="px-4 py-2 text-sm text-red-600 bg-red-100">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoice;
