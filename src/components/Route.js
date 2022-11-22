import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Login from "./Login.js";

const RouteConponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default RouteConponent