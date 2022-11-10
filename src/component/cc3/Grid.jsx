import React, { useState } from "react";
import { useEffect } from "react";
import Block from "./Block";

// Grid size can be chosen
// 8x8
// 12x12
// 16x16
// 32x32

const Grid = () => {
  // Generate 8x8 matrix

  const matrix = [];
  for (let i = 0; i < 8; i++) {
    matrix.push([]);
    for (let j = 0; j < 8; j++) {
      matrix[i].push("N");
    }
  }

  const [generatedGrid, setGeneratedGrid] = useState(matrix);
  // console.log(matrix);

  useEffect =
    (() => {
      console.log("Generated Grid: ", generatedGrid);
    },
    [generatedGrid]);

  return (
    <div className="grid grid-cols-8 border border-black">
      {matrix.map((row, i) => {
        return row.map((col, j) => {
          return (
            <Block
              key={`${i}${j}`}
              rowIndex={i}
              colIndex={j}
              generatedGrid={generatedGrid}
              setGeneratedGrid={setGeneratedGrid}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
