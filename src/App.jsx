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
import Customers from './components/Customers';
import Users from './components/Users';
import Suppliers from './components/Suppliers';
import CustomerEnquiry from './components/CustomerEnquiry';
import ProformaInvoice from './components/ProformaInvoice';
import OrderConfirmation from './components/OrderConfirmation';
import PaymentReceived from './components/PaymentReceived';
import LoadAuthority from './components/LoadAuthority';
import Settings from './components/Settings';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/general-ledger" element={<GeneralLedger />} />
          <Route path="/accounts-payable" element={<AccountsPayable />} />
          <Route path="/accounts-receivable" element={<AccountsReceivable />} />
          <Route path="/financial-reporting" element={<FinancialReporting />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoices" element={<InvoiceForm />} />
          <Route path="/customer-data" element={<Customers />} />
          <Route path="/user-data" element={<Users />} />
          <Route path="/supplier-data" element={<Suppliers />} />
          <Route path="/customer-enquiry" element={<CustomerEnquiry />} />
          <Route path="/proforma-invoice" element={<ProformaInvoice />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment-received" element={<PaymentReceived />} />
          <Route path="/load-authority" element={<LoadAuthority />} />
          <Route path="/settins" element={<Settings />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
