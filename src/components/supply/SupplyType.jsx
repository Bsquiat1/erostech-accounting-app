import React, { useState } from 'react';

const SupplyType = () => {
  const [supplyType, setSupplyType] = useState('local');
  const [paymentCurrency, setPaymentCurrency] = useState('KSH');

  const handleSupplyTypeChange = (event) => {
    setSupplyType(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setPaymentCurrency(event.target.value);
  };

  return (
    <div>
      <h3>Select Supply Type:</h3>
      <div>
        <input
          type="radio"
          id="local"
          name="supplyType"
          value="local"
          checked={supplyType === 'local'}
          onChange={handleSupplyTypeChange}
        />
        <label htmlFor="local">Local Supply</label>
      </div>
      <div>
        <input
          type="radio"
          id="export"
          name="supplyType"
          value="export"
          checked={supplyType === 'export'}
          onChange={handleSupplyTypeChange}
        />
        <label htmlFor="export">Export Supply</label>
      </div>

      <h3>Select Payment Currency:</h3>
      <div>
        <input
          type="radio"
          id="ksh"
          name="paymentCurrency"
          value="KSH"
          checked={paymentCurrency === 'KSH'}
          onChange={handleCurrencyChange}
        />
        <label htmlFor="ksh">KSH</label>
      </div>
      <div>
        <input
          type="radio"
          id="usd"
          name="paymentCurrency"
          value="USD"
          checked={paymentCurrency === 'USD'}
          onChange={handleCurrencyChange}
        />
        <label htmlFor="usd">USD</label>
      </div>
    </div>
  );
};

export default SupplyType;
