import React from "react";
import uniqolor from "uniqolor";
import "./Belong.scss";

interface IBelongProps {}
const getRandomPosition = () => {
  const { color } = uniqolor.random();
  const left = Math.floor(Math.random() * 90 + 1);
  const top = Math.floor(Math.random() * 90 + 1);
  return {
    backgroundColor: color,
    left: `${left}%`,
    top: `${top}%`,
  };
};

const Belong: React.FC<IBelongProps> = ({ children }) => {
  const style = getRandomPosition();
  return (
    <div className="belong" style={style}>
      {children}
    </div>
  );
};

export default Belong;
