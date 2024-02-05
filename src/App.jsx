import React from 'react';
import Cookies from 'js-cookie'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NavBar from './components/navigation/Navbar';

import InventoryForm from './components/inventory/InventoryForm';
import InventoryList from './components/inventory/InventoryList';

import Login from './components/authentication/Login'
import Register from './components/authentication/Register';
import Dashboard from './components/dashboard/Dashboard';
import InvoiceForm from './components/invoice/InvoiceForm';
import Customers from './components/customer/Customers';
import Companies from './components/company/Companies';
import CustomerEnquiry from './components/sales/CustomerEnquiry';
import ProformaInvoice from './components/sales/ProformaInvoice';
import OrderConfirmation from './components/sales/OrderConfirmation';
import PaymentReceived from './components/sales/PaymentReceived';
import LoadAuthority from './components/sales/LoadAuthority';
import Settings from './components/Settings';
import Invoices from './components/invoices/Invoices';
import GatePass from './components/sales/GatePass';
import SupplierInvoice from './components/supply/SupplierInvoice';

import Suppliers from './components/suppliers/Suppliers';
import SalesInvoice from './components/sales/SalesInvoice';
import Payment from './components/supply/Payment';
import SupplyType from './components/supply/SupplyType'
import ProInvoice from './components/ProInvoice';
import Gatepass from './components/Gatepass';
import Depots from './components/Depots';
import Entries from './components/entries/Entries';

import FuelMovement from './components/secondary-pages/fuel-movement';
import SetBalance from './components/secondary-pages/setBalance';
import Users from './components/users/users';
import Password from './components/authentication/password';
import Messages from './components/messaging/messages';


const App = () => {

  const PrivateRoute = ({ element, path }) => {
    const isAuthenticated = Cookies.get('token') !== undefined; // Check if the token cookie exists
  
    return isAuthenticated ? element : <Navigate to="/" />; // Redirect to login if not authenticated
  };
  

  return (
   
      <Router>
        
        <Routes>
          <Route path="/dashboard" element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Dashboard />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/inventory"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <InventoryList />
                  </React.Fragment>
                }
              />
            }
          />
          
          <Route path="/inventory/add" element={<InventoryForm />} />
         
          <Route path="/reset/:token" element={<Password />} />

          <Route path="" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/invoice-form" element={<InvoiceForm />} />
          <Route path="/customer-data" element={<Customers />} />
          <Route path="/company-data" element={<Companies />} />
          
          <Route path="/customer-enquiry" element={<CustomerEnquiry />} />
          <Route path="/proforma-invoice" element={<ProformaInvoice />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment-received" element={<PaymentReceived />} />
          <Route path="/load-authority" element={<LoadAuthority />} />
          <Route path="/generate-invoice" element={<Invoices />} />
          <Route path="/generate-gate-pass" element={<GatePass />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/users"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Users />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/invoice-data" element={<Invoices/>} />
          <Route path="/supplier-invoice" element={<SupplierInvoice />} />
          
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/sales-invoice" element={<SalesInvoice />} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/supply-type" element={<SupplyType/>} />
          <Route path="/pro-invoice" element={<ProInvoice />} />
          <Route path="/entry-data" element={<Entries />} />

          <Route path="/messages"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Messages />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/gatepass"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Gatepass />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/depots"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Depots />
                  </React.Fragment>
                }
              />
            }
          />

          {/* secondary pages */}

          <Route path="/fuel-balance"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <SetBalance />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/fuel-movement"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <FuelMovement />
                  </React.Fragment>
                }
              />
            }
          />


        </Routes>
      </Router>
  
  );
};

export default App;
