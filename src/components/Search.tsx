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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onClickButton();
    }
  };
  return (
    <div
      className={classNames("search", {
        active,
      })}
    >
      <div className="input-group">
        <input className="input" value={keyword} onChange={onInputChange} placeholder="请输入英文关键术语进行检索" onKeyDown={onKeyDown} />
        <div className="button button-search" onClick={onClickButton}>
          Search
        </div>
      </div>
    </div>
  );
};

export default Search;
