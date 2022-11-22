import postReducer from "./postReducer";
import usersReducer from "./userReducer";
// import loggedReducer from './isLogged'
import { combineReducers } from "redux";
import alertReducer from "./alertReducer";

const allReducers = combineReducers({
  userData: usersReducer,
//   isLogged: loggedReducer,
  posts: postReducer,
  alert: alertReducer
});
export default allReducers;
