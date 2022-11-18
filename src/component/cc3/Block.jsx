import React from "react";

const Block = ({ rowIndex, colIndex, content, runFiller }) => {
  return (
    <div
      style={{
        backgroundColor: `rgb(${content.r}, ${content.g}, ${content.b}, ${content.a})`,
      }}
      className={`w-12 h-12 border border-black `}
      onClick={(e) => {
        runFiller(rowIndex, colIndex);
      }}
    />
  );
};

export default Block;
