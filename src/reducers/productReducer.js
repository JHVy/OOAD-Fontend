import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS
} from "../actions/types";

const initialState = {
  products: [],
  isLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoaded: true,
        type: action.type
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoaded: true,
        type: action.type
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload._id
        ),
        type: action.type
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        response: action.response,
        type: action.type
      };

    default:
      return state;
  }
}
