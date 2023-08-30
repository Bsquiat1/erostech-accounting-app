// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import invoicesReducer from './invoicesReducer.js'; // Import your reducer(s)
import generalLedgerReducer from './generalLedgerReducer.js';
import accountsPayableReducer from './accountsPayableReducer.js';

const rootReducer = combineReducers({
 invoices: invoicesReducer,
 generalLedgerReducer: generalLedgerReducer,
 accountsPayableReducer: accountsPayableReducer
 
});

export default rootReducer;
