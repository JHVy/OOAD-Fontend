import {
  GET_PARAMETERS,
  ADD_PARAMETER,
  DELETE_PARAMETER,
  UPDATE_PARAMETER,
  GET_ALL_PARAMETERS
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import mongoose from "mongoose";

export const getParameters = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  // dispatch(setParametersLoading());
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response =>
      dispatch({ type: GET_PARAMETERS, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const getAllParameters = query => (dispatch, getState) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;

  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/getall/${newQuery}`,
      tokenConfig(getState)
    )
    .then(response =>
      dispatch({ type: GET_ALL_PARAMETERS, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const deleteParameter = id => (dispatch, getState) => {
  console.log(id);

  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_PARAMETER,
        payload: response.data
      });
    })
    .catch(er => console.log(er.response));
};

export const addParameter = newParameter => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/`,
      newParameter,
      tokenConfig(getState)
    )
    .then(response => {
      if (newParameter._id instanceof mongoose.Types.ObjectId) {
        newParameter._id = newParameter._id.toString();
      }

      dispatch({
        type: ADD_PARAMETER,
        payload: newParameter
      });
    })
    .catch(er => console.log(er.response));
};

export const updateParameter = newParameter => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/${newParameter._id}`,
      newParameter,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_PARAMETER,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
