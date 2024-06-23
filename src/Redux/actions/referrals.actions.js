import axios from "axios";
import { server } from "../../config/serverapi";

// load user
export const GET_ALL_USER_REFERRALS_REQUEST = () => async (dispatch) => {
    try {
      dispatch({
        type: "GET_ALL_USER_REFERRALS_REQUEST_REQUEST",
      });
      const { data } = await axios.get(`${server}/user/get-user`, {
        withCredentials: true,
      });
      dispatch({
        type: "GET_ALL_USER_REFERRALS_REQUEST_SUCCESS",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "GET_ALL_USER_REFERRALS_REQUEST_FAIL",
        payload: error.response?.data?.message || "Failed to load user",
      });
    }
  };