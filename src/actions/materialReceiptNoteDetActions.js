import {
  GET_MATERIALRECEIPTNOTEDETS,
  ADD_MATERIALRECEIPTNOTEDET,
  DELETE_MATERIALRECEIPTNOTEDET,
  GET_ALL_MATERIALRECEIPTNOTEDETS,
  UPDATE_MATERIALRECEIPTNOTEDET,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import mongoose from "mongoose";

export const getMaterialReceiptNoteDets = (show = 10, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(`${process.env.REACT_APP_BACKEND_HOST}/api/receiptdet/${show}/${page}/${newQuery}`, tokenConfig(getState))
    .then(response => dispatch({ type: GET_MATERIALRECEIPTNOTEDETS, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const getAllMaterialReceiptNoteDets = query => (dispatch, getState) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;

  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/receiptdet/getall/${newQuery}`,
      tokenConfig(getState)
    )
    .then(response =>
      dispatch({ type: GET_ALL_MATERIALRECEIPTNOTEDETS, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const deleteMaterialReceiptNoteDet = id => (dispatch, getState) => {
  axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/receiptdet/${id}`, tokenConfig(getState)).then(response => {
    dispatch({
      type: DELETE_MATERIALRECEIPTNOTEDET,
      payload: response.data
    });
  });
};

export const addMaterialReceiptNoteDet = det => (dispatch, getState) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_HOST}/api/receiptdet/`, det, tokenConfig(getState))
    .then(response => {
      if (det._id instanceof mongoose.Types.ObjectId) {
        det._id = det._id.toString();
      }

      dispatch({
        type: ADD_MATERIALRECEIPTNOTEDET,
        payload: det,
        response: response.status
      });
    });
};

export const updateMaterialReceiptNoteDet = det => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/receiptdet/${det._id}`,
      det,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_MATERIALRECEIPTNOTEDET,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
