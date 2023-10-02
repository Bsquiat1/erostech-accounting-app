import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectInvoiceData,
  selectSubtotal,
  selectTax,
  selectTotal,
} from '../../redux/invoiceSlice'
import { generateGatepass } from '../../redux/gatepassSlice';


const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

const SalesInvoice = () => {
  const invoiceData = useSelector(selectInvoiceData);
  const subtotal = useSelector(selectSubtotal);
  const tax = useSelector(selectTax);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const handleGenerateGatepass = () => {
    // Dispatch an action to generate the gatepass
    dispatch(generateGatepass(invoiceData)); 
  };

  return (
    <div className="container mx-auto mt-28 px-4">
      <div className="invoice-container">
        <h2 className="text-3xl mb-4">Final Invoice</h2>

        {invoiceData ? (
          <>
            <div className="mb-4">
              <p className="font-bold">Invoice Number:</p>
              <p>{invoiceData?.invoiceNumber}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold">Date:</p>
              <p>{formatDate(new Date(invoiceData?.date))}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold">Due Date:</p>
              <p>{formatDate(new Date(invoiceData?.dueDate))}</p>
            </div>

            {invoiceData.rows && invoiceData.rows.length > 0 ? (
              <table className="table table-bordered mb-4">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData?.rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.description}</td>
                      <td>{row.unitPrice}</td>
                      <td>{row.quantity}</td>
                      <td>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No items in the invoice.</p>
            )}

            <div className="mb-4">
              <p className="font-bold">Subtotal:</p>
              <p>{subtotal}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold">Tax:</p>
              <p>{tax}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold">Total:</p>
              <p>{total}</p>
            </div>
          </>
        ) : (
          <p>No invoice data available.</p>
        )}
      </div>
      <button
          onClick={handleGenerateGatepass}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Generate Gatepass
        </button>
    </div>
  );
};

export default SalesInvoice;
