// src/redux/reducers/accountsPayableReducer.js

// Define your initial state
const initialState = {
  // Define your initial state properties here
  // For example:
  invoices: [],
  payments: [],
};

const accountsPayableReducer = (state = initialState, action) => {
  switch (action.type) {
    // Define your action types and corresponding state updates
    // For example:
    case 'ADD_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    default:
      return state; // Return the current state if no action type matches
  }
};

export default accountsPayableReducer;
