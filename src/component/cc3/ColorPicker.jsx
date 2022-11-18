import { useState } from "react";
import { SketchPicker, SwatchesPicker } from "react-color";

const ColorPicker = ({ defaultColor, dispatch, selectedColor, picker }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(defaultColor);
  console.log("ColorPicker: ", color);

  const handleClick = () => {
    if (
      color.rgb.r === selectedColor.r &&
      color.rgb.g === selectedColor.g &&
      color.rgb.b === selectedColor.b
    ) {
      setDisplayColorPicker(!displayColorPicker);
    } else {
      dispatch({ type: "settingSelectedColor", payload: color.rgb });
    }
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (colored) => {
    setColor(colored);
    dispatch({ type: "settingSelectedColor", payload: color.rgb });
  };

  return (
    <div className="w-12 h-5 m-2">
      <div
        className="p-[1px] bg-black border inline-block cursor-pointer"
        onClick={handleClick}
      >
        <div
          style={{
            backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
          }}
          className="w-12 h-5 border border-slate-700 rounded-sm"
        />
      </div>
      {displayColorPicker ? (
        <div className="absolute z-50">
          <div className="fixed inset-0 bg-transparent" onClick={handleClose} />
          {picker === "SwatchesPicker" ? (
            <SwatchesPicker
              color={color}
              onChange={handleChange}
              onChangeComplete={handleClose}
            />
          ) : (
            <SketchPicker color={color} onChange={handleChange} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
