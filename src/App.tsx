import React from "react";
import logo from "./logo.svg";
import Terms from "./assets/terms.json";
import Belong from "./components/Belong";
import Term from "./components/Term";
import "./App.scss";

const termsToArray = () => {
  return Object.entries(Terms);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {termsToArray().map(([key, value], i) => {
          return value.map(({ shortName }, i) => {
            return <Belong key={i}>{shortName}</Belong>;
          });
        })}
      </header>
    </div>
  );
}

export default App;
