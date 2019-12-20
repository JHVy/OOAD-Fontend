import {
  GET_MATERIALRECEIPTNOTEDETS,
  ADD_MATERIALRECEIPTNOTEDET,
  GET_ALL_MATERIALRECEIPTNOTEDETS
} from "../actions/types";

const initialState = {
  materialreceiptnotedets: [],
  isLoaded: false,
  type: null,
  response: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MATERIALRECEIPTNOTEDETS:
      return {
        ...state,
        materialreceiptnotedets: action.payload,
        isLoaded: true,
        type: action.type
      };

    case GET_ALL_MATERIALRECEIPTNOTEDETS:
      return {
        ...state,
        materialreceiptnotedets: action.payload,
        isLoaded: true
      };
    case ADD_MATERIALRECEIPTNOTEDET:
      return {
        ...state,
        materialreceiptnotedets: [action.payload, ...state.materialreceiptnotedets],
        type: action.type,
        response: action.response
      };

    default:
      return state;
  }
}
