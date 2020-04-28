import React, { useCallback, useState } from "react";
import Terms from "./assets/terms.json";
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
      <div className="contack-info">
        <div className="faq">
          没有找到？
          <a href="https://github.com/Gnotes/terms/pulls" target="_blank">
            欢迎 PR
          </a>
        </div>
        <div className="copyright"> Gnotes &copy; all rights reserved</div>
      </div>
    </div>
  );
}

export default App;
