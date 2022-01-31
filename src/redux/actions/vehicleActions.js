import axios from "axios";
import { toast } from "react-toastify";

export const getAllVehicles = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const { data } = await axios.get("/api/vehicles/get-vehicles");
    dispatch({ type: "GET_ALL_VEHICLES", payload: data.vehicles });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addVehicle = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/vehicles/create", reqObj);

    dispatch({ type: "LOADING", payload: false });
    toast.success("New vehicle added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editVehicle = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/vehicles/editvehicle", reqObj);

    dispatch({ type: "LOADING", payload: false });
    toast.success("Details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 2500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteVehicle = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/vehicles/deletevehicle", reqObj);

    dispatch({ type: "LOADING", payload: false });
    toast.success("Car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
