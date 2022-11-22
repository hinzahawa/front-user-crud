import postReducer from "./postReducer";
import usersReducer from "./userReducer";
// import loggedReducer from './isLogged'
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userData: usersReducer,
//   isLogged: loggedReducer,
  posts: postReducer,
});
export default allReducers;
