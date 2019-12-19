import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  CHECK_CUR_PASS_USER,
  CLEAR_ERRORS,
  UPDATE_USER
} from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";

import { tokenConfig } from "./authActions";

export const getUsers = (show = 5, page = 1, query) => (dispatch, getState) => {
  // dispatch(setUsersLoading());
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_USERS, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_USER,
        payload: response.data
      });
    })
    .catch(er => console.log(er.response));
};

export const addUser = newUser => (dispatch, getState) => {
  let newUser2 = { ...newUser, idRole: newUser.idRole._id };
  console.log(newUser2);

  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/`,
      newUser2,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: ADD_USER,
        payload: newUser
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_USER_FAIL")
      )
    );
};

export const checkCurPassUser = id => dispatch => {
  console.log("userActionCheckCurPass");
  axios
    .post(`${process.env.REACT_APP_BACKEND_HOST}/api/cp/${id}`)
    .then(response => {
      // console.log("userActionCheckCurPass");
      dispatch({
        type: CHECK_CUR_PASS_USER,
        payload: response.data
      });
    })
    .catch(er => console.log(er.response));
};

export const updateUser = newUser => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/${newUser._id}`,
      newUser,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_USER
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
