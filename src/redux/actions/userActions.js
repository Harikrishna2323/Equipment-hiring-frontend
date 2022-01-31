import axios from "axios";
import { toast } from "react-toastify";

export const userLogin = (email, password) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const { data } = await axios.post(
      "https://hkb-rentals.herokuapp.com/api/auth/login",
      { email, password }
    );
    toast.success("Login success.");
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong.");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (username, email, password) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const { data } = await axios.post(
      "https://hkb-rentals.herokuapp.com/api/auth/register",
      {
        username,
        email,
        password,
      }
    );
    toast.success("Register success.");
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    toast("Something went wrong. Please try again");
    dispatch({ type: "LOADING", payload: false });
  }
};
