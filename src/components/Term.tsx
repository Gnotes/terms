import React from "react";
import "./Term.scss";

interface ITermProps {
  belongTo: string;
  shortName: string;
  fullNameZH: string;
  fullNameEN: string;
  descriptions: string[];
}

const Term: React.FC<ITermProps> = ({ shortName, fullNameZH, fullNameEN, belongTo, descriptions }) => {
  return (
    <div className="term-item">
      <div className="term-head">
        <div className="short-name">{shortName}</div>
        <div>
          <div className="full-name-en">{fullNameEN}</div>
          <div className="belong-to">{belongTo}</div>
        </div>
      </div>
      <div className="term-body">
        <div className="full-name-zh">{fullNameZH}</div>
        <div className="description">
          {descriptions.map((desc, i) => {
            return <p className="description-item"></p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Term;
