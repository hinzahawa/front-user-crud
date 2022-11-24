import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import headers from "../helper/headersAPI";

function DemoUnitTest2() {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState([]);
  const initialState = [1, 2, 3, 4, 5];
  const fetchUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(`${config.SERVER}/api/users`, headers());
    setUsers(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="DemoUnitTest2">
      <button onClick={() => setResult([...result, ...initialState])}>
        Fetch
      </button>
      <button onClick={() => setResult([])}>Reset</button>
      <ul data-testid="ul-content">
        {result.map((value, index) => {
          return (
            <li role="li-number" key={index}>
              {value}
            </li>
          );
        })}
      </ul>
      {users.map((value, index) => {
        return (
          <div key={index}>
            <h3>{value.username}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default DemoUnitTest2;
