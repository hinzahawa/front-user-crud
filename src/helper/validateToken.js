import Cookies from "universal-cookie";
import { isExpired } from "react-jwt";

const validateToken = () => {
  const cookies = new Cookies();
  const auth_token = cookies.get("XSv8T");
  if (auth_token) {
    if (isExpired(auth_token)) return false;
    else return true;
  }
  return false;
};

export default validateToken;
