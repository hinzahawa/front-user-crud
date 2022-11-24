import React from "react";

function DemoUnitTest() {
  return (
    <div>
      <div className="toBeDisabled()">
        toBeDisabled() DemoUnitTest
        <button data-testid="button" type="submit" disabled>
          submit
        </button>
        <button data-testid="button2" type="submit">
          submit
        </button>
        <fieldset disabled>
          <input type="text" data-testid="input" />
        </fieldset>
      </div>

      <div className="toBeEmptyDOMElement()">
        toBeEmptyDOMElement()
        <span data-testid="not-empty">
          <span data-testid="empty"></span>
        </span>
        <span data-testid="with-whitespace"> test </span>
        <span data-testid="with-comment">{/*<!-- comment -->*/}</span>
      </div>

      <div className="toBeInvalid()">
        toBeInvalid()
        <input data-testid="no-aria-invalid" />
        <input data-testid="aria-invalid" aria-invalid />
        <input data-testid="aria-invalid-value" aria-invalid="true" />
        <input data-testid="aria-invalid-false" aria-invalid="false" />
        <form data-testid="valid-form">
          <input />
        </form>
        <form data-testid="invalid-form">
          <input required />
        </form>
      </div>

      <div className="toBeRequired()">
        toBeRequired()
        <input data-testid="required-input" required />
        <input data-testid="aria-required-input" />
        <input data-testid="aria-not-required-input" aria-required="false" />
      </div>

      <div className="toBeVisible()">
        toBeVisible()
        <div data-testid="zero-opacity" style={{ opacity: 0 }}>
          Zero Opacity Example
        </div>
        <div data-testid="visibility-hidden" style={{ visibility: "hidden" }}>
          Visibility Hidden Example
        </div>
        <div data-testid="display-none" style={{ display: "none" }}>
          Display None Example
        </div>
        <div style={{ opacity: 0 }}>
          <span data-testid="hidden-parent">Hidden Parent Example</span>
        </div>
        <div data-testid="visible">Visible Example</div>
        <div data-testid="hidden-attribute" hidden>
          Hidden Attribute Example
        </div>
        <details>
          <summary>Title of hidden text</summary>
          Hidden Details Example
        </details>
        <details open>
          <summary>Title of visible text</summary>
          <div>Visible Details Example</div>
        </details>
      </div>

      <div className="toContainElement()">
        toContainElement()
        <span data-testid="ancestor">
          <span data-testid="descendant"></span>
        </span>
        <span data-testid="does-not-exist" />
      </div>

      <div className="toContainHTML()">
        toContainHTML()
        <span data-testid="parent">
          <span data-testid="child"></span>
        </span>
      </div>

      <div className="toHaveAccessibleDescription()">
        toHaveAccessibleDescription()
        <a
          data-testid="link"
          href="/"
          aria-label="Home page"
          title="A link to start over"
        >
          Start
        </a>
        <a data-testid="extra-link" href="/about" aria-label="About page">
          About
        </a>
        <img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
        <img
          src="logo.jpg"
          data-testid="logo"
          alt="Company logo"
          aria-describedby="t1"
        />
        <span id="t1" role="presentation">
          The logo of Our Company
        </span>
      </div>

      <div className="toHaveAccessibleName()">
        toHaveAccessibleName()
        <img data-testid="img-alt" src="" alt="Test alt" />
        <img data-testid="img-empty-alt" src="" alt="" />
        <svg data-testid="svg-title">
          <title>Test title</title>
        </svg>
        <button data-testid="button-img-alt">
          <img src="" alt="Test" />
        </button>
        <p>
          <img data-testid="img-paragraph" src="" alt="" /> Test content
        </p>
        <button data-testid="svg-button">
          <svg>
            <title>Test</title>
          </svg>
        </button>
        <div>
          <svg data-testid="svg-without-title"></svg>
        </div>
        <input data-testid="input-title" title="test" />
      </div>

      <div className="toHaveAttribute()">
        toHaveAttribute()
        <button data-testid="ok-button" type="submit" disabled>
          ok
        </button>
      </div>

      <div className="toHaveClass()">
        toHaveClass()
        <button data-testid="delete-button" class="btn extra btn-danger">
          Delete item
        </button>
        <button data-testid="no-classes">No Classes</button>
      </div>

      <div className="toHaveFocus()">
        toHaveFocus()
        <input type="text" data-testid="element-to-focus" />
      </div>

      <div className="toHaveFormValues()">
        toHaveFormValues()
        <form data-testid="login-form">
          <input type="text" name="username" value="jane.doe" />
          <input type="password" name="password" value="12345678" />
          <input type="checkbox" name="rememberMe" defaultChecked />
          <button type="submit">Sign in</button>
        </form>
      </div>

      <div className="toHaveStyle()">
        toHaveStyle()
        <button
          data-testid="delete-buttons"
          style={{ display: "none", "background-color": "red" }}
        >
          Delete item
        </button>
      </div>

      <div className="toHaveTextContent()">
        toHaveTextContent()
        <span data-testid="text-content-1">Text Content</span>
      </div>

      <div className="toHaveValue()">
        toHaveValue()
        <input type="text" value="text" data-testid="input-text" />
        <input type="number" value="5" data-testid="input-number" />
        <input type="text" data-testid="input-empty" />
        <select multiple data-testid="select-number">
          <option value="first">First Value</option>
          <option value="second" selected>
            Second Value
          </option>
          <option value="third" selected>
            Third Value
          </option>
        </select>
      </div>

      <div className="toHaveDisplayValue()">
        toHaveDisplayValue()
        <label for="input-example">First name</label>
        <input type="text" id="input-example" value="Luca" />
        <label for="textarea-example">Description</label>
        <textarea id="textarea-example">An example description here.</textarea>
        <label for="single-select-example">Fruit</label>
        <select id="single-select-example">
          <option value="">Select a fruit...</option>
          <option value="banana">Banana</option>
          <option value="ananas">Ananas</option>
          <option value="avocado">Avocado</option>
        </select>
        <label for="multiple-select-example">Fruits</label>
        <select id="multiple-select-example" multiple>
          <option value="">Select a fruit...</option>
          <option value="banana" selected>
            Banana
          </option>
          <option value="ananas">Ananas</option>
          <option value="avocado" selected>
            Avocado
          </option>
        </select>
      </div>

      <div className="toBeChecked()">
        toBeChecked()
        <input type="checkbox" checked data-testid="input-checkbox-checked" />
        <input type="checkbox" data-testid="input-checkbox-unchecked" />
      </div>

      <div className="toBePartiallyChecked()">
        toBePartiallyChecked()
        <input
          type="checkbox"
          aria-checked="mixed"
          data-testid="aria-checkbox-mixed-2"
        />
        <input type="checkbox" checked data-testid="input-checkbox-checked-2" />
        <input type="checkbox" data-testid="input-checkbox-unchecked-2" />
        {/*<div
          role="checkbox"
          aria-checked="true"
          data-testid="aria-checkbox-checked-2"
        />asd
        <div
          role="checkbox"
          aria-checked="false"
          data-testid="aria-checkbox-unchecked-2"
        />
        <input type="checkbox" data-testid="input-checkbox-indeterminate-2" /> */}
      </div>

      <div className="toHaveErrorMessage()">
        toHaveErrorMessage()
        <label for="startTime">
          Please enter a start time for the meeting:
        </label>
        <input
          id="startTime"
          type="text"
          aria-errormessage="msgID"
          aria-invalid="true"
          value="11:30 PM"
        />
        <span
          id="msgID"
          aria-live="assertive"
          style={{ visibility: "visible" }}
        >
          Invalid time: the time must be between 9:00 AM and 5:00 PM
        </span>
      </div>

      <div className="toBeEmpty()">
        toBeEmpty()
        <span data-testid="not-empty-2">
          <span data-testid="empty-2"></span>
        </span>
      </div>

      <div className="getAllByTestId()">
        getAllByTestId()
        <ul>
          {[1, 2, 3, 4, 5].map((value) => {
            return (
              <>
                <li data-testid="li">{value}</li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DemoUnitTest;
