import { combineReducers } from "redux";
import usersReducer from "./userReducer";
import alertReducer from "./alertReducer";
import UsersDataListReducer from "./UsersDataListReducer";

const allReducers = combineReducers({
  userData: usersReducer,
  alert: alertReducer,
  usersDataList: UsersDataListReducer,
});
export default allReducers;
