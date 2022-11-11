import React, { useState } from "react";
import { useEffect } from "react";
import MyButton from "./MyButton";
import Block from "./Block";

// Grid size can be chosen
// 8x8
// 12x12
// 16x16
// 32x32

const Grid = () => {
  const [gridSize, setGridSize] = useState(8);
  const [gridToModify, setGridToModify] = useState([]);

  // Generate Grid based on grid size
  let generateGrid = (size) => {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid.push([]);
      for (let j = 0; j < size; j++) {
        grid[i].push("N");
      }
    }
    setGeneratedGrid(grid);
    setGridToModify(grid);
  };
  const [generatedGrid, setGeneratedGrid] = useState([]);

  useEffect(() => {
    console.log("generateGrid ran");
    generateGrid(gridSize);
  }, [gridSize]);

  useEffect(() => {
    console.log(
      "I have modified the generatedGrid with the changes: ",
      gridToModify
    );
    setGeneratedGrid(gridToModify);
  }, [gridToModify]);

  return (
    <div className="p-4">
      <p className="bg-transparent pb-2">Select grid size</p>
      <select
        defaultValue={gridSize}
        onChange={(e) => {
          console.log("Grid size is: ", e.target.value);
          setGridSize(e.target.value.toString());
        }}
        id="grid-size"
        className="mb-8 bg-black text-yellow-50 text-xl border border-yellow-50"
      >
        {[8, 12, 16, 32].map((size) => {
          return (
            <option
              key={`grid-size-is-${size}`}
              value={size}
            >{`${size}x${size}`}</option>
          );
        })}
      </select>
      <div className="flex flex-row">
        <MyButton text={"Color"} />
        <MyButton text={"Pen"} clicked={true} />
        <MyButton text={"Bucket"} />
      </div>
      <div className="w-fit overflow-auto">
        {
          <div
            className={`w-full grid border border-black ${
              gridSize === "12"
                ? "grid-cols-12"
                : gridSize === "16"
                ? "grid-cols-16"
                : gridSize === "32"
                ? "grid-cols-32"
                : "grid-cols-8"
            }`}
          >
            {generatedGrid &&
              generatedGrid.map((row, i) => {
                return row.map((col, j) => {
                  return (
                    <Block
                      key={`${gridSize}-${i}${j}`}
                      rowIndex={i}
                      colIndex={j}
                      generatedGrid={generatedGrid}
                      setGeneratedGrid={setGeneratedGrid}
                      gridToModify={gridToModify}
                      setGridToModify={setGridToModify}
                    />
                  );
                });
              })}
          </div>
        }
      </div>
    </div>
  );
};

export default Grid;
