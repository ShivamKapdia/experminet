import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/index.js';

//means application is not providing any pre-loaded data when the Redux store is first created.
const initialState = {};

//The primary purpose of Redux Thunk is to allow your action creators to handle asynchronous logic beacause Redux is synchronous. It expects every action dispatched to be a plain JavaScript object, and in asynchronous logic we can't immediately return an action object with the data because you have to wait for the API response.In short, redux-thunk gives your action creators the ability to wait for asynchronous operations to complete before dispatching the final action that will actually update the state in the reducer. 

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;