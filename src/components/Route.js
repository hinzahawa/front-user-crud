import { Route, Routes } from "react-router-dom";
import DemoUnitTest from "./DemoUnitTest.js";
import DemoUnitTest2 from "./DemoUnitTest2.js";
import Login from "./Login.js";
import NotFound from "./NotFound.js";
import Users from "./Users/Users.js";

const RouteConponent = () => {
  return (
    <>
      {/* <Router> */}
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/users" exact element={<Users />}></Route>
        <Route path="/test" exact element={<DemoUnitTest />}></Route>
        <Route path="/test2" exact element={<DemoUnitTest2 />}></Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* </Router> */}
    </>
  );
};

export default RouteConponent;
