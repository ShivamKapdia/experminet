import { FETCH_POSTS, NEW_POST, UPDATE_POST, DELETE_POST } from '../actions/actionTypes';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case UPDATE_POST:
      const updatedItems = state.items.map(post =>
        post.id === action.payload.id ? action.payload : post
      );
      return { ...state, items: updatedItems };
    case DELETE_POST:
      return { ...state, items: state.items.filter(post => post.id !== action.payload) };
    default:
      return state;
  }
}