const initialState = {
    currentStep: 'enquiry',
    customerInfo: {
      customerName: '',
      customerEmail: '',
    },
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STEP':
        return { ...state, currentStep: action.payload };
      case 'SET_CUSTOMER_INFO':
        return { ...state, customerInfo: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;
  