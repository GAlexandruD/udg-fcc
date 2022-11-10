import React, { useState } from "react";

const Block = ({ rowIndex, colIndex, generatedGrid, setGeneratedGrid }) => {
  const [color, setColor] = useState("YELLOW");
  return (
    <div
      className={`w-12 h-12 border border-black ${
        color === "YELLOW" ? "bg-yellow-400" : "bg-black"
      }`}
      onClick={(e) => {
        console.log("Generated Grid is: ", generatedGrid);
        console.log("Clicked on: ", `Row: ${rowIndex}, Col: ${colIndex}`);
        setColor(color === "BLACK" ? "YELLOW" : "BLACK");
        setGeneratedGrid(
          { ...generatedGrid },
          (generatedGrid[rowIndex][colIndex] = color)
        );
        // console.log(
        //   "Element in grid is: ",
        //   (generatedGrid[rowIndex][colIndex] = color)
        // );
      }}
    />
  );
};

export default Block;
