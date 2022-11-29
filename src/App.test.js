import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import allReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(allReducer, composeWithDevTools());

test("renders login page", () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  //navbar
  expect(screen.getByAltText("logo")).toBeInTheDocument();
  expect(screen.getByAltText("logo")).toHaveAccessibleName("logo");
  expect(screen.getByText("Users Management")).toBeInTheDocument();
  //login
  const inputUsername = screen.getByLabelText("Username");
  expect(inputUsername).toBeInTheDocument();
  expect(inputUsername).toHaveValue("");
  expect(inputUsername).toBeRequired();
  const inputPassword = screen.getByLabelText("Password");
  expect(inputPassword).toBeInTheDocument();
  expect(inputPassword).toHaveValue("");
  expect(inputPassword).toBeRequired();
  const buttonLogin = screen.getByRole("button", { name: "Log in" });
  expect(buttonLogin).toBeDisabled();
});

test("onchange input username,password for undisiabled button", () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const inputUsername = screen.getByLabelText("Username");
  const inputPassword = screen.getByLabelText("Password");
  fireEvent.change(inputUsername, { target: { value: "test1" } });
  fireEvent.change(inputPassword, { target: { value: "123" } });
  screen.debug();
  expect(inputUsername).toHaveValue("test1");
  expect(inputPassword).toHaveValue("123");
  const buttonLogin = screen.getByRole("button", { name: "Log in" });
  expect(buttonLogin).not.toBeDisabled();
});

test("login", async () => {
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

  //navbar
  expect(await screen.findByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Home").closest("a")).toHaveAttribute(
    "href",
    "/users"
  );
  expect(await screen.findByText("Features")).toBeInTheDocument();
  expect(await screen.findByText("Pricing")).toBeInTheDocument();
  const userDropdown = await screen.findByAltText("UserName profile image");
  expect(userDropdown).toBeInTheDocument();

  //alert popup
  const alertPopup = await screen.findByRole("alert");
  const closeBtn = await screen.findByLabelText("Close alert");
  expect(alertPopup).toBeInTheDocument();
  expect(await screen.findByText("Success")).toBeInTheDocument();
  expect(await screen.findByText("login successfully.")).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();

  //close alertPopup
  fireEvent.click(closeBtn);
  expect(alertPopup).not.toBeInTheDocument();

  //table list user
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
  expect(await screen.findByRole("btn-row-user-0")).toBeInTheDocument();
  screen.debug();
});

test("log out", async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const buttonUserDropdown = await screen.findByAltText(
    "UserName profile image"
  );
  fireEvent.click(buttonUserDropdown);
  const buttonLogout = await screen.findByRole("button", { name: "Log out" });
  fireEvent.click(buttonLogout);
  screen.debug();
  const inputUsername = await screen.findByLabelText("Username");
  const inputPassword = await screen.findByLabelText("Password");
  const buttonLogin = screen.getByRole("button", { name: "Log in" });
  expect(inputUsername).toBeInTheDocument()
  expect(inputPassword).toBeInTheDocument() 
  expect(buttonLogin).toBeInTheDocument()   
  expect(buttonLogin).toBeDisabled()   
});
