import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Term, { ITermProps } from "./components/Term";
import Loading from "./components/Loading";
import DB from "./db";
import "./App.scss";

function App() {
  const [terms, setTerms] = useState();
  const [loading, setLoading] = useState(true);
  const [db, setDB] = useState();
  useEffect(() => {
    import("./assets/terms.json")
      .then(({ default: Terms }) => {
        const db = new DB(Terms);
        setDB(db);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const onSearch = (keyword: string) => {
    if (!db) return null;
    setLoading(true);
    const { code, message, data } = db.search(keyword);
    if (code === 200) {
      setTerms(data);
    }
    setLoading(false);
  };
  const onClear = () => {
    setTerms(null);
  };

  return (
    <div className="App">
      <Loading loading={loading} />
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
