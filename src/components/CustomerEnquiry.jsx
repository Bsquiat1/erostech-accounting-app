import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests

const CustomerEnquiry = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Define the form data to send to the server
      const formData = {
        name: customerName,
        email: customerEmail,
        message: enquiryMessage,
      };

      // Make a POST request to your backend endpoint
      const response = await axios.post('/api/customer-enquiries', formData);

      // Handle the response from the server (e.g., display a success message)
      if (response.status === 201) {
        alert('Enquiry submitted successfully!');
        // Clear the form fields after submission
        setCustomerName('');
        setCustomerEmail('');
        setEnquiryMessage('');
      } else {
        alert('Enquiry submission failed.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('An error occurred while submitting the enquiry.');
    }
  };

  return (
    <div>
      <h2>Customer Enquiry</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="customerEmail">Customer Email:</label>
          <input
            type="email"
            id="customerEmail"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="enquiryMessage">Enquiry Message:</label>
          <textarea
            id="enquiryMessage"
            value={enquiryMessage}
            onChange={(e) => setEnquiryMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
};

export default CustomerEnquiry;
