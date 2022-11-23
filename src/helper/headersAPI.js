import Cookies from "universal-cookie";
export default function headers() {
  const cookies = new Cookies();
  const auth_token = cookies.get("XSv8T");
  if (auth_token) {
    return {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };
  }
}
