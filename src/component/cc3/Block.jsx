import React, { useEffect, useState } from "react";

const Block = ({
  rowIndex,
  colIndex,
  generatedGrid,
  setGeneratedGrid,
  gridToModify,
  setGridToModify,
}) => {
  const [color, setColor] = useState("YELLOW");

  useEffect(() => {
    console.log("The color of the pen that I held in my hand is: ", color);
  }, [color]);
  return (
    <div
      className={`w-12 h-12 border border-black ${
        color === "YELLOW" ? "bg-yellow-400" : "bg-black"
      }`}
      onClick={(e) => {
        // Pen painting
        // TODO: Add condition to check if the pen is selected
        if (true) {
          console.log("color1 is: ", color);
          setColor(color === "BLACK" ? "YELLOW" : "BLACK");
          console.log("color2 is: ", color);
          const newGrid = [...gridToModify];
          newGrid[rowIndex][colIndex] = color === "BLACK" ? "YELLOW" : "BLACK";

          setGridToModify(newGrid);
        }

        // console.log("Generated Grid is: ", generatedGrid);
        // console.log("Clicked on: ", `Row: ${rowIndex}, Col: ${colIndex}`);
        // setColor(color === "BLACK" ? "YELLOW" : "BLACK");
        // setGeneratedGrid(
        //   { ...generatedGrid },
        //   (generatedGrid[rowIndex][colIndex] = color)
        // );
        console.log(
          "Element in grid is: ",
          (generatedGrid[rowIndex][colIndex] = color)
        );
      }}
    />
  );
};

export default Block;
