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

  screen.debug();
});

test("edit user", async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  //buttonEdit
  const buttonEdit = await screen.findByRole("btn-row-user-0");
  expect(buttonEdit).toBeInTheDocument();
  fireEvent.click(buttonEdit);
  expect(await screen.findByText("Edit User")).toBeInTheDocument();
  const inputUsernameEdit = await screen.findByPlaceholderText(
    "Enter firstname"
  );
  expect(inputUsernameEdit).toBeInTheDocument();
  fireEvent.change(inputUsernameEdit, { target: { value: "Jadon1" } });
  const inputSubmit = await screen.findByText("Submit");
  expect(inputSubmit).toBeInTheDocument();
  fireEvent.click(inputSubmit);

  //alert popup
  const alertPopup = await screen.findByRole("alert");
  expect(alertPopup).toBeInTheDocument();
  expect(await screen.findByText("Success")).toBeInTheDocument();
  expect(await screen.findByText("updated successfully.")).toBeInTheDocument();
});

test("create user", async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  //buttonEdit
  const buttonAdd = await screen.findByRole("button", { name: "Add" });
  expect(buttonAdd).toBeInTheDocument();
  fireEvent.click(buttonAdd);
  expect(await screen.findByText("Create User")).toBeInTheDocument();
  const input = {
    username: await screen.findByPlaceholderText("Enter username"),
    firstname: await screen.findByPlaceholderText("Enter firstname"),
    surname: await screen.findByPlaceholderText("Enter surname"),
    password: await screen.findByPlaceholderText("Enter password"),
    birthday: await screen.findByPlaceholderText("Enter birthday"),
  };
  for (const [key, value] of Object.entries(input)) {
    expect(value).toBeInTheDocument();
    switch (key) {
      case "username":
        fireEvent.change(value, { target: { value: "test8" } });
        break;
      case "firstname":
        fireEvent.change(value, { target: { value: "Ryan" } });
        break;
      case "surname":
        fireEvent.change(value, { target: { value: "Gigs" } });
        break;
      case "password":
        fireEvent.change(value, { target: { value: "123" } });
        break;
      case "birthday":
        fireEvent.change(value, { target: { value: "2011-02-20" } });
        break;
      default:
        break;
    }
  }
  const inputSubmit = await screen.findByText("Submit");
  expect(inputSubmit).toBeInTheDocument();
  fireEvent.click(inputSubmit);
  // const inputSubmit = await screen.findByText("Submit");
  // expect(inputSubmit).toBeInTheDocument();
  // fireEvent.click(inputSubmit);

  // alert popup
  const alertPopup = await screen.findByRole("alert");
  expect(alertPopup).toBeInTheDocument();
  expect(await screen.findByText("Success")).toBeInTheDocument();
  expect(await screen.findByText("register successfully.")).toBeInTheDocument();
});

test("delete user", async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  //buttonEdit
  const buttonDelete = await screen.findByRole("btn-row-user-del-6");
  expect(buttonDelete).toBeInTheDocument();
  fireEvent.click(buttonDelete);
  const buttonConfirm = await screen.findByText("OK");
  expect(buttonConfirm).toBeInTheDocument();
  fireEvent.click(buttonConfirm);

  // alert popup
  const alertPopup = await screen.findByRole("alert");
  expect(alertPopup).toBeInTheDocument();
  expect(await screen.findByText("Success")).toBeInTheDocument();
  expect(await screen.findByText("deleted successfully.")).toBeInTheDocument();
});
