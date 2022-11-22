import "./App.css";

import React from "react";
import RouteConponent from "./components/Route";
import NavBar from "./components/Navbar";
import AlertPopUp from "./components/AlertPopUp";

// import PostForm from "./components/PostForm";
// import PostAll from "./components/PostAll";

export default function App() {
  return (
    <div className="App">
      <NavBar/>
      <AlertPopUp/>
      <RouteConponent />
      {/* <PostForm />
      <PostAll /> */}
      {/* <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header> */}
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
