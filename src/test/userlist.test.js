import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import allReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import Users from "../components/Users/Users";

const store = createStore(allReducer, composeWithDevTools());

test("load page", async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const inputUsername = screen.getByLabelText("Username");
  const inputPassword = screen.getByLabelText("Password");
  const buttonLogin = screen.getByRole("button", { name: "Log in" });
  fireEvent.change(inputUsername, { target: { value: "test1" } });
  fireEvent.change(inputPassword, { target: { value: "123" } });
  fireEvent.click(buttonLogin);
  //   table list user
  const listUser = await screen.findByRole("table-list-users");
  expect(listUser).toBeInTheDocument();
  expect(await screen.findByText("No.")).toBeInTheDocument();
  expect(await screen.findByText("Username")).toBeInTheDocument();
  expect(await screen.findByText("First Name")).toBeInTheDocument();
  expect(await screen.findByText("Last Name")).toBeInTheDocument();
  expect(await screen.findByText("Birthday")).toBeInTheDocument();
  expect(await screen.findByText("action")).toBeInTheDocument();
  const rowUser = await screen.findAllByRole("row-user");
  expect(rowUser.length).toBeGreaterThan(0);
  //buttonEdit
  const buttonEdit = await screen.findByRole("btn-row-user-0");
  expect(buttonEdit).toBeInTheDocument();
  fireEvent.click(buttonEdit);
  expect(await screen.findByText("Edit User")).toBeInTheDocument();
  const inputUsernameEdit = await screen.findByPlaceholderText(
    "Enter firstname"
  );
  expect(inputUsernameEdit).toBeInTheDocument();
  fireEvent.change(inputUsernameEdit, { target: { value: "jadon" } });
  const inputSubmit = await screen.findByText("Submit");
  expect(inputSubmit).toBeInTheDocument();
  fireEvent.click(inputSubmit);

  //alert popup
  const alertPopup = await screen.findByRole("alert");
  expect(alertPopup).toBeInTheDocument();
  expect(await screen.findByText("Success")).toBeInTheDocument();
  expect(await screen.findByText("updated successfully.")).toBeInTheDocument();
  screen.debug();
});
