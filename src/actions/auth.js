import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import Swal from "sweetalert2";

//LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//REGISTER USER
export const register =
  ({ name, email, phone, role, province, city, password, access }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      role === "Manufacturer" ||
      role === "Retailer" ||
      role === "PRO" ||
      role === "Recycling Depot" ||
      role === "DEFF"
    ) {
      access = "Pending";
    } else {
      access = "n/a";
    }

    const body = JSON.stringify({
      name,
      email,
      phone,
      role,
      province,
      city,
      password,
      access,
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user",
        body,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        title: "Register Successful",
        text: "You are all set! If you are a Manufacturer/Recycling Depot/Retailer or PRO, we will get back to you as soon as your registration is approved!",
        icon: "success",
        confirmButtonColor: "#6fb327",
        confirmButtonText: "Alright!",
      });
      //dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({ type: REGISTER_FAIL });
    }
  };

//LOGIN USER
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert("Logged in successfully 🎉", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert("Logged out successfully", "success"));
};
