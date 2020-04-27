import React, { useState } from "react";
import classNames from "classnames";
import "./Search.scss";

interface ISearchProps {
  onSearch: (keyword: string) => void;
  onClear: () => void;
}

const Search: React.FC<ISearchProps> = ({ onSearch, onClear }) => {
  const [keyword, setKeyWord] = useState("");
  const [active, setActive] = useState(false);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyWord(value.trim());
  };
  const onClickButton = () => {
    if (!keyword) {
      onClear();
      setActive(false);
      return;
    }
    onSearch(keyword);
    setActive(true);
  };
  return (
    <div
      className={classNames("search", {
        active,
      })}
    >
      <div className="input-group">
        <input className="input" value={keyword} onChange={onInputChange} placeholder="请输入关键字术语进行检索" />
        <div className="button button-search" onClick={onClickButton}>
          Search
        </div>
      </div>
    </div>
  );
};

export default Search;
