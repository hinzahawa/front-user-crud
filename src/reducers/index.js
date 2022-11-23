import postReducer from "./postReducer";
import usersReducer from "./userReducer";
// import loggedReducer from './isLogged'
import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import UsersDataListReducer from "./UsersDataListReducer";

const allReducers = combineReducers({
  userData: usersReducer,
  //   isLogged: loggedReducer,
  posts: postReducer,
  alert: alertReducer,
  usersDataList: UsersDataListReducer,
});
export default allReducers;
