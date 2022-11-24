import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import DemoUnitTest2 from "../components/DemoUnitTest2";
test("render user data",async () => {
  // const fakeUser = {
  //   username: "test",
  // };
  render(<DemoUnitTest2 />);
  // screen.debug()
});
