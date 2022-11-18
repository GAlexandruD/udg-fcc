import React, { useRef, useEffect } from "react";
import MyButton from "./MyButton";
import Block from "./Block";
import ColorPicker from "./ColorPicker";
import exportAsImage from "../utils/exportAsImage";
import floodFill from "../utils/floodFill";
import { useReducer } from "react";

const Grid = () => {
  // TODO: Add init(initialArg). It is a function that returns the initial state.
  const exportRef = useRef();
  const initialState = {
    gridSize: "8",
    array: [],
    color: { r: 0, g: 0, b: 0, a: 1 },
    penType: "pen",
    picker: "SwatchesPicker",
    selectedColor: { r: 255, g: 216, b: 76, a: 1 },
  };

  function reducer(state, action) {
    switch (action.type) {
      case "settingArray":
        console.log("State is: ", state);
        return { ...state, array: [...action.payload] };
      case "settingColor":
        return { ...state, color: { ...action.payload } };
      case "settingGridSize":
        return { ...state, gridSize: action.payload };
      case "settingPenType":
        return { ...state, penType: action.payload };
      case "settingSelectedColor":
        return { ...state, selectedColor: { ...action.payload } };
      case "settingPicker":
        return { ...state, picker: action.payload };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // Generate Grid based on grid size
  let generateGrid = (size) => {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid.push([]);
      for (let j = 0; j < size; j++) {
        grid[i].push({
          r: 255,
          g: 255,
          b: 255,
          a: 1,
        });
      }
    }
    dispatch({ type: "settingArray", payload: grid });
  };

  // Generate grid on page load and when grid size changes
  useEffect(() => {
    generateGrid(state.gridSize);
  }, [state.gridSize]);

  // Update grid when click on block
  const runFiller = (rowIndex, colIndex) => {
    let grid = state.array;
    if (state.penType === "pen") {
      // Pen painting
      grid[rowIndex][colIndex] = state.selectedColor;
      dispatch({ type: "settingArray", payload: grid });
    } else {
      // Bucket painting

      //Run flood fill function
      grid = floodFill(state.array, rowIndex, colIndex, state.selectedColor);
      dispatch({ type: "settingArray", payload: grid });
    }
  };

  return (
    <div className="p-4 w-full flex flex-col justify-center items-center">
      <div className="">
        <p className="bg-transparent pb-2">Select grid size</p>
        <select
          defaultValue={state.gridSize}
          onChange={(e) => {
            dispatch({ type: "settingGridSize", payload: e.target.value });
          }}
          id="grid-size"
          className="mb-8 bg-green-600 text-yellow-50 text-xl border border-yellow-50"
        >
          {[8, 12, 16, 32].map((size) => {
            return (
              <option
                key={`grid-size-is-${size}`}
                value={size}
              >{`${size} x ${size}`}</option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row">
        <MyButton
          onClick={(e) => {
            console.log("Clicked on pen", state);
            dispatch({ type: "settingPenType", payload: "pen" });
          }}
          text={"✏️"}
          clicked={state.penType === "pen" ? true : false}
          bgColor={`rgba(${state.selectedColor.r},${state.selectedColor.g},${state.selectedColor.b},${state.selectedColor.a})`}
        />
        <MyButton
          clicked={state.penType === "bucket" ? true : false}
          onClick={(e) => {
            dispatch({
              type: "settingPenType",
              payload: "bucket",
            });
          }}
          text={"🪣"}
          bgColor={`rgba(${state.selectedColor.r},${state.selectedColor.g},${state.selectedColor.b},${state.selectedColor.a})`}
        />
        <button
          className="m-2 bg-green-600 transition duration-150 ease-in-out focus:outline-none border border-transparent hover:bg-green-500 rounded text-yellow-50 px-2 sm:px-5 h-8 flex items-center text-md shadow-md shadow-green-800"
          type="button"
          onClick={() => {
            dispatch({
              type: "settingPicker",
              payload:
                state.picker === "SwatchesPicker"
                  ? "SketchPicker"
                  : "SwatchesPicker",
            });
          }}
        >
          {state.picker === "SketchPicker" ? "SketchPicker" : "SwatchesPicker"}
        </button>
        <button
          className="m-2 bg-green-600 transition duration-150 ease-in-out focus:outline-none border border-transparent hover:bg-green-500 rounded text-yellow-50 px-2 sm:px-5 h-8 flex items-center text-md shadow-md shadow-green-800"
          type="button"
          onClick={() => {
            exportAsImage(
              exportRef.current,
              `pixel-art-creation-${state.gridSize}x${state.gridSize}`
            );
          }}
        >
          Save to PNG
        </button>
      </div>
      <div className="grid grid-cols-3  sm:flex">
        {[
          [255, 216, 76], // yellow
          [200, 33, 10], // red
          [8, 47, 202], // blue
          [81, 205, 81], // green
          [97, 93, 207], // purple
          [255, 145, 26], // orange
        ].map((color, i) => {
          return (
            <ColorPicker
              key={`color-picker-${i}`}
              defaultColor={{
                rgb: { r: color[0], g: color[1], b: color[2], a: 1 },
              }}
              dispatch={dispatch}
              selectedColor={state.selectedColor}
              picker={state.picker}
            />
          );
        })}
      </div>
      <div className="w-full h-full relative pt-4 overflow-auto mx-auto">
        <div className="relative mx-auto ">
          {
            <div
              ref={exportRef}
              className={`mx-auto w-fit grid border border-black ${
                state.gridSize === "12"
                  ? "grid-cols-12"
                  : state.gridSize === "16"
                  ? "grid-cols-16"
                  : state.gridSize === "32"
                  ? "grid-cols-32"
                  : "grid-cols-8"
              }`}
            >
              {state.array.map((row, i) => {
                return row.map((col, j) => {
                  return (
                    <Block
                      key={`${state.gridSize}-${i}${j}`}
                      rowIndex={i}
                      colIndex={j}
                      content={state.array[i][j]}
                      runFiller={runFiller}
                    />
                  );
                });
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Grid;
