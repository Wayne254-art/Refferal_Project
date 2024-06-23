// src/redux/actions/userActions.js
import axios from "axios";
import { server } from "../../config/serverapi";
import { toast } from "react-toastify";

// Load user action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

// Update user action
export const updateUser = (userId, userData, password) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });
    const response = await axios.patch(
      `${server}/user/update-user/${userId}`,
      { ...userData, password },
      { withCredentials: true }
    );
    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: response.data.updatedUser,
    });
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload: error.response?.data?.message || "Something went wrong",
    });
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

// Update user avatar action
export const updateUserAvatar = (userId, file) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("avatar", file);

    dispatch({ type: "UPDATE_USER_AVATAR_REQUEST" });
    const response = await axios.patch(
      `${server}/user/update-user-avatar/${userId}`,
      newForm,
      { withCredentials: true },
      config
    );
    dispatch({
      type: "UPDATE_USER_AVATAR_SUCCESS",
      payload: response.data.updatedUser,
    });
    toast.success(response.data.message);
    window.location.reload(true); // Reload the page or handle navigation as needed
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_AVATAR_FAIL",
      payload: error.response?.data?.message || "Image upload failed",
    });
    toast.error(error.response?.data?.message || "Image upload failed");
  }
};
