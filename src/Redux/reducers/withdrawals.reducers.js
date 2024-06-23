// src/redux/reducers/withdrawalReducer.js
import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_WITHDRAWAL_REQUESTS_REQUEST,
  FETCH_WITHDRAWAL_REQUESTS_SUCCESS,
  FETCH_WITHDRAWAL_REQUESTS_FAILURE,
  UPDATE_WITHDRAWAL_STATUS_REQUEST,
  UPDATE_WITHDRAWAL_STATUS_SUCCESS,
  UPDATE_WITHDRAWAL_STATUS_FAILURE,
} from '../actions/withdrawals.actions';

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const withdrawalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_WITHDRAWAL_REQUESTS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(FETCH_WITHDRAWAL_REQUESTS_SUCCESS, (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    })
    .addCase(FETCH_WITHDRAWAL_REQUESTS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_WITHDRAWAL_STATUS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(UPDATE_WITHDRAWAL_STATUS_SUCCESS, (state, action) => {
      state.loading = false;
      state.requests = state.requests.map((req) =>
        req.activityId === action.payload ? { ...req, activityStatus: 'completed' } : req
      );
    })
    .addCase(UPDATE_WITHDRAWAL_STATUS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addDefaultCase((state) => {});
});

export default withdrawalReducer;
