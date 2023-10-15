import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'  
import customerReducer from './customerSlice'
import invoiceReducer from './invoiceSlice'
import gatepassReducer from './gatepassSlice'
import supplierReducer from './supplierSlice'
import depotReducer from './depotSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        customer: customerReducer,
        invoice: invoiceReducer,
        gatepass: gatepassReducer,
        supplier: supplierReducer,
        depot: depotReducer,
    },
})
