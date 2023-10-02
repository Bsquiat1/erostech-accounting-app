

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  supplierData: {
    name: 'Sample Supplier',
    // Add other supplier details as needed
  },
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    setSupplierData: (state, action) => {
      state.supplierData = action.payload;
    },
  },
});

export const { setSupplierData } = supplierSlice.actions;
export const selectSupplierData = (state) => state.supplier.supplierData;
export default supplierSlice.reducer;
