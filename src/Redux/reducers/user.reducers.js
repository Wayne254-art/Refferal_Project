// src/redux/reducers/userReducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LOAD_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOAD_USER_SUCCESS", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("LOAD_USER_FAIL", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null;
    })
    .addCase("LOGOUT_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOGOUT_USER_SUCCESS", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    })
    .addCase("LOGOUT_USER_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UPDATE_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("UPDATE_USER_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("UPDATE_USER_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UPDATE_USER_AVATAR_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("UPDATE_USER_AVATAR_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("UPDATE_USER_AVATAR_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addDefaultCase((state) => {});
});

export default userReducer;
