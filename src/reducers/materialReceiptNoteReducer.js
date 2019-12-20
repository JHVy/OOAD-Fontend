import {
  GET_MATERIALRECEIPTNOTES,
  GET_ALL_MATERIALRECEIPTNOTES,
  ADD_MATERIALRECEIPTNOTE,
  DELETE_MATERIALRECEIPTNOTE,
  UPDATE_MATERIALRECEIPTNOTE
} from "../actions/types";

const initialState = {
  materialReceiptNotes: [],
  isLoaded: false,
  type: null,
  response: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MATERIALRECEIPTNOTES:
      return {
        ...state,
        materialReceiptNotes: action.payload,
        isLoaded: true
      };

    case GET_ALL_MATERIALRECEIPTNOTES:
      return {
        ...state,
        materialReceiptNotes: action.payload,
        isLoaded: true,
      };

    case DELETE_MATERIALRECEIPTNOTE:
      return {
        ...state,
        materialReceiptNotes: state.materialReceiptNotes.filter(
          materialreceiptnote => materialreceiptnote._id !== action.payload._id
        )
      };

    case ADD_MATERIALRECEIPTNOTE:
      return {
        ...state,
        materialReceiptNotes: [action.payload, ...state.materialReceiptNotes],
        type: action.type,
        response: action.response
      };

    case UPDATE_MATERIALRECEIPTNOTE:
      return {
        ...state
      };


    default:
      return state;
  }
}
