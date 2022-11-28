import { fireEvent, render, screen } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import axios from "axios";
import DemoUnitTest2 from "../components/DemoUnitTest2";
// import * as config from "../config";
import * as Cal from "../helper/cal";

const fakeUser = [
  {
    username: "test3",
  },
  {
    username: "test2",
  },
];
test("render user data", async () => {
  const calMock = jest.spyOn(Cal, "add").mockImplementation((a, b) => {
    return 99;
  });
  const axiosMock = jest
    .spyOn(axios, "get")
    .mockImplementation((url, header) => {
      console.log(
        "%c 🕒: url,data ",
        "font-size:16px;background-color:#00a43c;color:white;",
        url,
        header
      );
      return Promise.resolve({ data: fakeUser });
    });
  render(<DemoUnitTest2 />);
  // ใช้แบบ promise
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // expect(screen.getByText("test3")).toBeInTheDocument();
  const text = await screen.findByText("test3");
  const add = await screen.findByText("add: 99");
  screen.debug();
  expect(text).toBeInTheDocument();
  expect(add).toBeInTheDocument();
  calMock.mockClear();
  axiosMock.mockClear();
});
