import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  GET_USER,
  CHECK_CUR_PASS_USER,
  UPDATE_USER
} from "../actions/types";

const initialState = {
  users: [],

  isLoaded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoaded: true
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          supplier => supplier._id !== action.payload._id
        )
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };

    case CHECK_CUR_PASS_USER:
      return {
        ...state,
        checkCurPass: true
      };
    case UPDATE_USER:
      return {
        ...state
      };
    default:
      return state;
  }
}
