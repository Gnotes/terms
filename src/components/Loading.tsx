import React from "react";

interface ILoadingProps {
  loading: boolean;
}

const Loading: React.FC<ILoadingProps> = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="loading wrap">
      <div className="k-ball-holder3">
        <div className="k-ball7a"></div>
        <div className="k-ball7b"></div>
        <div className="k-ball7c"></div>
        <div className="k-ball7d"></div>
      </div>
    </div>
  );
};

export default Loading;
