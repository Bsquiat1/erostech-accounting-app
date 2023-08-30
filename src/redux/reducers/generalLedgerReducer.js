// src/redux/reducers/generalLedgerReducer.js

// Define your initial state
const initialState = {
  // Define your initial state properties here
  // For example:
  transactions: [],
  balances: {},
};

const generalLedgerReducer = (state = initialState, action) => {
  switch (action.type) {
    // Define your action types and corresponding state updates
    // For example:
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'UPDATE_BALANCES':
      return {
        ...state,
        balances: action.payload,
      };
    default:
      return state; // Return the current state if no action type matches
  }
};

export default generalLedgerReducer;
