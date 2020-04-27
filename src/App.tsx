import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import Terms from "./assets/terms.json";
import Names from "./assets/names.json";
import Belong from "./components/Belong";
import Search from "./components/Search";
import Term, { ITermProps } from "./components/Term";
import DB from "./db";
import "./App.scss";

const termsToArray = () => {
  return Object.entries(Terms);
};

function App() {
  const [terms, setTerms] = useState();
  const db = new DB(Terms);
  const onSearch = (keyword: string) => {
    const { code, message, data } = db.search(keyword);
    if (code === 200) {
      setTerms(data);
    }
  };
  const onClear = () => {
    setTerms(null);
  };

  return (
    <div className="App">
      <Search onSearch={onSearch} onClear={onClear} />
      <div className="terms-wrapper">
        {terms &&
          terms.map((term: ITermProps, index: number) => {
            return <Term {...term} key={index} />;
          })}
      </div>
    </div>
  );
}

export default App;
