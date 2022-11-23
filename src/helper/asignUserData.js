import Cookies from "universal-cookie";
import { decodeToken } from "react-jwt";
import { actionAssignUser } from "../actions/UserAction";
const cookies = new Cookies();

const SetDataUserStore = (dispatch, token) => {
  const auth_token = token ? token : cookies.get("XSv8T");
  const userData = decodeToken(auth_token);
  dispatch(actionAssignUser(userData));
};

export default SetDataUserStore;
