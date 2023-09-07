export const setStep = (step) => {
    return {
      type: 'SET_STEP',
      payload: step,
    };
  };
  
  export const setCustomerInfo = (customerInfo) => {
    return {
      type: 'SET_CUSTOMER_INFO',
      payload: customerInfo,
    };
  };
  