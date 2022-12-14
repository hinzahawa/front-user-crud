import React, { useEffect, useState } from "react";
import config from "../config";
import headers from "../helper/headersAPI";
import axios from "axios";
import { add } from "../helper/cal";

function DemoUnitTest2() {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState([]);
  const initialState = [1, 2, 3, 4, 5];
  const fetchUser = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(`${config.SERVER}/api/users`, headers());
    setUsers(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const UsersList = () => {
    if (users.length > 0) {
      return users.map((value, index) => {
        return (
          <div key={index}>
            <h3>{value.username}</h3>
          </div>
        );
      });
    } else
      return (
        <>
          <h3>No Users</h3>
        </>
      );
  };
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
      <UsersList />
      add: {add(1, 1)}
    </div>
  );
}

export default DemoUnitTest2;
