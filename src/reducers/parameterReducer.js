import {
  GET_PARAMETERS,
  ADD_PARAMETER,
  DELETE_PARAMETER,
  UPDATE_PARAMETER,
  GET_ALL_PARAMETERS,
} from "../actions/types";

const initialState = {
  parameters: [],
  isLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PARAMETERS:
      return {
        ...state,
        parameters: action.payload,
        isLoaded: true
      };

    case GET_ALL_PARAMETERS:
      return {
        ...state,
        parameters: action.payload,
      };

    case DELETE_PARAMETER:
      return {
        ...state,
        parameters: state.parameters.filter(
          parameter => parameter._id !== action.payload._id
        )
      };
    case ADD_PARAMETER:
      return {
        ...state,
        parameters: [action.payload, ...state.parameters]
      };
    case UPDATE_PARAMETER:
      return {
        ...state
        // parameters: [...state.slice(0, i), { ...state[i], likes }]
      };

    default:
      return state;
  }
}
