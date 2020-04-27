import React, { useState } from "react";
import classNames from "classnames";
import "./Term.scss";

export interface ITermProps {
  belongTo: string;
  shortName: string;
  fullNameZH: string;
  fullNameEN: string;
  descriptions: string[];
  [i: string]: any;
}

const Term: React.FC<ITermProps> = ({ shortName, fullNameZH, fullNameEN, belongTo, descriptions }) => {
  const [collpase, setCollpase] = useState(true);

  return (
    <div
      className={classNames("term-item", {
        collpase,
      })}
      onClick={() => {
        setCollpase(!collpase);
      }}
    >
      <div className="term-col col-left">
        <div className="short-name">{shortName}</div>
      </div>
      <div className="term-col col-center">
        <div className="full-name-en">{fullNameEN}</div>
        <div className="full-name-zh">{fullNameZH}</div>
      </div>
      <div className="term-col col-right">
        {collpase ? (
          <div className="description">{descriptions.join(";")}</div>
        ) : (
          <div className="description">
            {descriptions.map((desc, i) => {
              return (
                <div className="desc" key={i}>
                  {desc}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Term;
