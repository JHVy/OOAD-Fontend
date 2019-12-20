import {
  GET_MATERIALRECEIPTNOTES,
  ADD_MATERIALRECEIPTNOTE,
  DELETE_MATERIALRECEIPTNOTE,
  GET_ALL_MATERIALRECEIPTNOTES,
  UPDATE_MATERIALRECEIPTNOTE
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import mongoose from "mongoose";

export const getMaterialReceiptNotes = (show = 10, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/receipt/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({ type: GET_MATERIALRECEIPTNOTES, payload: response.data });
      console.log(response.data);
    })
    .catch(er => console.log(er.response));
};

export const getAllMaterialReceiptNotes = query => (dispatch, getState) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;

  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/receipt/getall/${newQuery}`,
      tokenConfig(getState)
    )
    .then(response =>
      dispatch({ type: GET_ALL_MATERIALRECEIPTNOTES, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const deleteMaterialReceiptNote = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/receipt/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_MATERIALRECEIPTNOTE,
        payload: response.data
      });
    });
};

export const addMaterialReceiptNote = newMaterialReceiptNote => (
  dispatch,
  getState
) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/receipt/`,
      newMaterialReceiptNote,
      tokenConfig(getState)
    )
    .then(response => {
      if (newMaterialReceiptNote._id instanceof mongoose.Types.ObjectId) {
        newMaterialReceiptNote._id = newMaterialReceiptNote._id.toString();
      }

      dispatch({
        type: ADD_MATERIALRECEIPTNOTE,
        payload: newMaterialReceiptNote,
        response: response.status
      });
    });
};

export const updateMaterialReceiptNote = newMaterialReceiptNote => (
  dispatch,
  getState
) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/receipt/${newMaterialReceiptNote._id}`,
      newMaterialReceiptNote,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_MATERIALRECEIPTNOTE,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
