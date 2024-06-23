// src/redux/reducers/depositReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { fetchDeposit } from "../actions/deposits.actions";


const initialState = {
  deposit: null,
  loading: false,
  error: null,
};

const depositReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchDeposit.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchDeposit.fulfilled, (state, action) => {
      state.loading = false;
      state.deposit = action.payload;
      state.error = null;
    })
    .addCase(fetchDeposit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default depositReducer;
