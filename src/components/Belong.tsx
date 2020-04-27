import React from "react";
import uniqolor from "uniqolor";
import "./Belong.scss";

interface IBelongProps {}
const isLight = () => {
  return Math.floor(Math.random() * 100) > 50;
};
const getRandomPosition = () => {
  const { color: bgColor } = uniqolor.random();
  const { color: fontColor } = uniqolor.random({ isLight: true });
  const left = Math.floor(Math.random() * 90 + 1);
  const top = Math.floor(Math.random() * 90 + 1);
  return {
    backgroundColor: bgColor,
    color: fontColor,
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
