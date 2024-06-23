// src/redux/actions/withdrawalActions.js
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../config/serverapi';

// Action types
export const FETCH_WITHDRAWAL_REQUESTS_REQUEST = 'FETCH_WITHDRAWAL_REQUESTS_REQUEST';
export const FETCH_WITHDRAWAL_REQUESTS_SUCCESS = 'FETCH_WITHDRAWAL_REQUESTS_SUCCESS';
export const FETCH_WITHDRAWAL_REQUESTS_FAILURE = 'FETCH_WITHDRAWAL_REQUESTS_FAILURE';
export const UPDATE_WITHDRAWAL_STATUS_REQUEST = 'UPDATE_WITHDRAWAL_STATUS_REQUEST';
export const UPDATE_WITHDRAWAL_STATUS_SUCCESS = 'UPDATE_WITHDRAWAL_STATUS_SUCCESS';
export const UPDATE_WITHDRAWAL_STATUS_FAILURE = 'UPDATE_WITHDRAWAL_STATUS_FAILURE';

// Action creators
export const fetchWithdrawalRequests = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_WITHDRAWAL_REQUESTS_REQUEST });
    const { data } = await axios.get(`${server}/activity/get-withdrawal-request`, {
      withCredentials: true,
    });
    dispatch({
      type: FETCH_WITHDRAWAL_REQUESTS_SUCCESS,
      payload: data.withdrawals,
    });
  } catch (error) {
    dispatch({
      type: FETCH_WITHDRAWAL_REQUESTS_FAILURE,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

export const updateWithdrawalStatus = (requestId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_WITHDRAWAL_STATUS_REQUEST });
    await axios.post(`${server}/activity/change-withdrawal-status/${requestId}`, {}, {
      withCredentials: true,
    });
    toast.success('Status updated successfully');
    dispatch({
      type: UPDATE_WITHDRAWAL_STATUS_SUCCESS,
      payload: requestId,
    });
  } catch (error) {
    toast.error(error.response?.data?.message || 'An error occurred');
    dispatch({
      type: UPDATE_WITHDRAWAL_STATUS_FAILURE,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};
