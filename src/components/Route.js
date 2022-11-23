import { Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import Users from "./Users/Users.js";

const RouteConponent = () => {
  return (
    <>
      {/* <Router> */}
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/users" exact element={<Users />}></Route>
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
      {/* </Router> */}
    </>
  );
};

export default RouteConponent;
