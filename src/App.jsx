import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


import NavBar from './components/Navbar';
import Home from './components/Home';
import InventoryForm from './components/inventory/InventoryForm';
import InventoryList from './components/inventory/InventoryList';
import Sales from './components/Sales';
import Login from './components/Login';
import Register from './components/Register';
import GeneralLedger from './components/accounting/GeneralLedger';
import AccountsPayable from './components/accounting/AccountsPayable';
import AccountsReceivable from './components/accounting/AccountsReceivable';
import FinancialReporting from './components/accounting/FinancialReporting';
import Dashboard from './components/Dashboard';

import InvoiceForm from './components/invoice/InvoiceForm';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/inventory/add" element={<InventoryForm />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Register />} />
            <Route path="/general-ledger" element={<GeneralLedger />} />
            <Route path="/accounts-payable" element={<AccountsPayable />} />
            <Route path="/accounts-receivable" element={<AccountsReceivable />} />
            <Route path="/financial-reporting" element={<FinancialReporting />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoices" element={<InvoiceForm/>} />



          </Routes>
       
      </Router>
    </Provider>
  );
};

export default App;
