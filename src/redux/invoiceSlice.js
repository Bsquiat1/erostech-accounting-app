// redux/invoiceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoiceData: null,
  subtotal: 0,
  tax: 0,
  total: 0,
};


const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },

    setTax: (state, action) => {
      state.tax = action.payload;
    },

    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});
export const { setSubtotal, setTax, setTotal } = invoiceSlice.actions;
export const { setInvoiceData } = invoiceSlice.actions;
export const selectInvoiceData = (state) => state.invoice.invoiceData;
export const selectSubtotal = (state) => state.invoice.subtotal;
export const selectTax = (state) => state.invoice.tax;
export const selectTotal = (state) => state.invoice.total;

export default invoiceSlice.reducer;
