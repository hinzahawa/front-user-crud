import { fireEvent, render, screen } from "@testing-library/react";
import DemoUnitTest from "../components/DemoUnitTest";
import DemoUnitTest2 from "../components/DemoUnitTest2";

test("toBeDisabled()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByText(/DemoUnitTest/i)).toBeInTheDocument();
  expect(screen.getByTestId("button")).toBeDisabled();
  expect(screen.getByTestId("input")).toBeDisabled();
  expect(screen.getByTestId("button2")).not.toBeDisabled();
});

test("toBeEmptyDOMElement()", () => {
  render(<DemoUnitTest />);
  // screen.debug()
  expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  expect(screen.getByTestId("not-empty")).not.toBeEmptyDOMElement();
  expect(screen.getByTestId("with-whitespace")).not.toBeEmptyDOMElement();
});

test("toBeInvalid()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByTestId("no-aria-invalid")).not.toBeInvalid();
  expect(screen.getByTestId("aria-invalid")).toBeInvalid();
  expect(screen.getByTestId("aria-invalid-value")).toBeInvalid();
  expect(screen.getByTestId("aria-invalid-false")).not.toBeInvalid();

  expect(screen.getByTestId("valid-form")).not.toBeInvalid();
  expect(screen.getByTestId("invalid-form")).toBeInvalid();
});

test("toBeRequired()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByTestId("required-input")).toBeRequired();
  expect(screen.getByTestId("aria-required-input")).not.toBeRequired();
  expect(screen.getByTestId("aria-not-required-input")).not.toBeRequired();
});

test("toBeVisible()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByText("Zero Opacity Example")).not.toBeVisible();
  expect(screen.getByText("Visibility Hidden Example")).not.toBeVisible();
  expect(screen.getByText("Display None Example")).not.toBeVisible();
  expect(screen.getByText("Hidden Parent Example")).not.toBeVisible();
  expect(screen.getByText("Visible Example")).toBeVisible();
  expect(screen.getByText("Hidden Attribute Example")).not.toBeVisible();
  expect(screen.getByText("Hidden Details Example")).not.toBeVisible();
  expect(screen.getByText("Visible Details Example")).toBeVisible();
});

test("toContainElement()", () => {
  render(<DemoUnitTest />);
  const ancestor = screen.getByTestId("ancestor");
  const descendant = screen.getByTestId("descendant");
  const nonExistantElement = screen.getByTestId("does-not-exist");

  expect(ancestor).toContainElement(descendant);
  expect(descendant).not.toContainElement(ancestor);
  expect(ancestor).not.toContainElement(nonExistantElement);
});

test("toContainHTML()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByTestId("parent")).toContainHTML(
    '<span data-testid="child"></span>'
  );
  expect(screen.getByTestId("parent")).toContainHTML(
    '<span data-testid="child" />'
  );
  expect(screen.getByTestId("parent")).not.toContainHTML("<br />");
});

test("toHaveAccessibleDescription()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByTestId("link")).toHaveAccessibleDescription();
  expect(screen.getByTestId("link")).toHaveAccessibleDescription(
    "A link to start over"
  );
  expect(screen.getByTestId("link")).not.toHaveAccessibleDescription(
    "Home page"
  );
  expect(screen.getByTestId("extra-link")).not.toHaveAccessibleDescription();
  expect(screen.getByTestId("avatar")).not.toHaveAccessibleDescription();
  expect(screen.getByTestId("logo")).not.toHaveAccessibleDescription(
    "Company logo"
  );
  expect(screen.getByTestId("logo")).toHaveAccessibleDescription(
    "The logo of Our Company"
  );
});

test("toHaveAccessibleName()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByTestId("img-alt")).toHaveAccessibleName("Test alt");
  expect(screen.getByTestId("img-empty-alt")).not.toHaveAccessibleName();
  expect(screen.getByTestId("svg-title")).toHaveAccessibleName("Test title");
  expect(screen.getByTestId("button-img-alt")).toHaveAccessibleName();
  expect(screen.getByTestId("img-paragraph")).not.toHaveAccessibleName();
  expect(screen.getByTestId("svg-button")).toHaveAccessibleName();
  expect(screen.getByTestId("svg-without-title")).not.toHaveAccessibleName();
  expect(screen.getByTestId("input-title")).toHaveAccessibleName("test");
});

test("toHaveAttribute()", () => {
  render(<DemoUnitTest />);
  const button = screen.getByTestId("ok-button");

  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).not.toHaveAttribute("type", "button");

  expect(button).toHaveAttribute("type", expect.stringContaining("sub"));
  expect(button).toHaveAttribute("type", expect.not.stringContaining("but"));
});

test("toHaveClass()", () => {
  render(<DemoUnitTest />);
  const deleteButton = screen.getByTestId("delete-button");
  const noClasses = screen.getByTestId("no-classes");

  expect(deleteButton).toHaveClass("extra");
  expect(deleteButton).toHaveClass("btn-danger btn");
  expect(deleteButton).toHaveClass("btn-danger", "btn");
  expect(deleteButton).not.toHaveClass("btn-link");

  expect(deleteButton).toHaveClass("btn-danger extra btn", { exact: true }); // to check if the element has EXACTLY a set of classes
  expect(deleteButton).not.toHaveClass("btn-danger extra", { exact: true }); // if it has more than expected it is going to fail

  expect(noClasses).not.toHaveClass();
});

test("toHaveFocus()", () => {
  render(<DemoUnitTest />);
  const input = screen.getByTestId("element-to-focus");

  input.focus();
  expect(input).toHaveFocus();

  input.blur();
  expect(input).not.toHaveFocus();
});

test("toHaveFormValues()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByTestId("login-form")).toHaveFormValues({
    username: "jane.doe",
    password: "12345678",
    rememberMe: true,
  });
});

test("toHaveStyle()", () => {
  render(<DemoUnitTest />);
  const button = screen.getByTestId("delete-buttons");

  expect(button).toHaveStyle("display: none");
  expect(button).toHaveStyle({ display: "none" });
  expect(button).toHaveStyle(`
  background-color: red;
  display: none;
`);
  expect(button).toHaveStyle({
    backgroundColor: "red",
    display: "none",
  });
  expect(button).not.toHaveStyle(`
  background-color: blue;
  display: none;
`);
  expect(button).not.toHaveStyle({
    backgroundColor: "blue",
    display: "none",
  });
});

test("toHaveTextContent()", () => {
  render(<DemoUnitTest />);
  const element = screen.getByTestId("text-content-1");

  expect(element).toHaveTextContent("Content");
  expect(element).toHaveTextContent(/^Text Content$/); // to match the whole content
  expect(element).toHaveTextContent(/content$/i); // to use case-insensitive match
  expect(element).not.toHaveTextContent("content");
});

test("toHaveValue()", () => {
  render(<DemoUnitTest />);
  const textInput = screen.getByTestId("input-text");
  const numberInput = screen.getByTestId("input-number");
  const emptyInput = screen.getByTestId("input-empty");
  const selectInput = screen.getByTestId("select-number");

  expect(textInput).toHaveValue("text");
  expect(numberInput).toHaveValue(5);
  expect(emptyInput).not.toHaveValue();
  expect(selectInput).toHaveValue(["second", "third"]);
});

test("toHaveDisplayValue()", () => {
  render(<DemoUnitTest />);
  const input = screen.getByLabelText("First name");
  const textarea = screen.getByLabelText("Description");
  const selectSingle = screen.getByLabelText("Fruit");
  const selectMultiple = screen.getByLabelText("Fruits");

  expect(input).toHaveDisplayValue("Luca");
  expect(input).toHaveDisplayValue(/Luc/);
  expect(textarea).toHaveDisplayValue("An example description here.");
  expect(textarea).toHaveDisplayValue(/example/);
  expect(selectSingle).toHaveDisplayValue("Select a fruit...");
  expect(selectSingle).toHaveDisplayValue(/Select/);
  expect(selectMultiple).toHaveDisplayValue([/Avocado/, "Banana"]);
});

test("toBeChecked()", () => {
  render(<DemoUnitTest />);
  const inputCheckboxChecked = screen.getByTestId("input-checkbox-checked");
  const inputCheckboxUnchecked = screen.getByTestId("input-checkbox-unchecked");
  expect(inputCheckboxChecked).toBeChecked();
  expect(inputCheckboxUnchecked).not.toBeChecked();
});

test("toBePartiallyChecked()", () => {
  render(<DemoUnitTest />);
  const ariaCheckboxMixed = screen.getByTestId("aria-checkbox-mixed-2");
  const inputCheckboxChecked = screen.getByTestId("input-checkbox-checked-2");
  const inputCheckboxUnchecked = screen.getByTestId(
    "input-checkbox-unchecked-2"
  );
  // const ariaCheckboxChecked = screen.getByTestId("aria-checkbox-checked-2");
  // const ariaCheckboxUnchecked = screen.getByTestId("aria-checkbox-unchecked-2");
  // const inputCheckboxIndeterminate = screen.getByTestId(
  //   "input-checkbox-indeterminate-2"
  // );

  expect(ariaCheckboxMixed).toBePartiallyChecked();
  expect(inputCheckboxChecked).not.toBePartiallyChecked();
  expect(inputCheckboxUnchecked).not.toBePartiallyChecked();
  // expect(ariaCheckboxChecked).not.toBePartiallyChecked();
  // expect(ariaCheckboxUnchecked).not.toBePartiallyChecked();

  // inputCheckboxIndeterminate.indeterminate = true;
  // expect(inputCheckboxIndeterminate).toBePartiallyChecked();
});

test("should first", () => {
  render(<DemoUnitTest />);
  const timeInput = screen.getByLabelText(
    "Please enter a start time for the meeting:"
  );

  expect(timeInput).toHaveErrorMessage(
    "Invalid time: the time must be between 9:00 AM and 5:00 PM"
  );
  expect(timeInput).toHaveErrorMessage(/invalid time/i); // to partially match
  expect(timeInput).toHaveErrorMessage(expect.stringContaining("Invalid time")); // to partially match
  expect(timeInput).not.toHaveErrorMessage("Pikachu!");
});

test("toBeEmpty()", () => {
  render(<DemoUnitTest />);
  expect(screen.getByTestId("empty-2")).toBeEmpty();
  expect(screen.getByTestId("not-empty-2")).not.toBeEmpty();
});

test("getAllByTestId ()", () => {
  render(<DemoUnitTest />);
  expect(screen.getAllByTestId("li").length).toBe(5);
});
test("Role and ClickEvent", () => {
  render(<DemoUnitTest2 />);
  const button = screen.getByRole("button", { name: "Fetch" });
  const buttonReset = screen.getByRole("button", { name: "Reset" });
  expect(button).toBeInTheDocument();
  expect(buttonReset).toBeInTheDocument();
  fireEvent.click(button);  // กด Fetch
  expect(screen.getAllByRole("li-number").length).toBe(5); // แสดง <li></li> 5 อัน
  fireEvent.click(button);
  expect(screen.getAllByRole("li-number").length).toBe(10);
  fireEvent.click(button);
  expect(screen.getAllByRole("li-number").length).toBe(15);
  fireEvent.click(buttonReset); // กด Reset
  expect(screen.queryByRole("li-number")).not.toBeInTheDocument(); //ไม่เจอ <li></li>
});
