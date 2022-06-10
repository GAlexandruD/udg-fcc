import { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ defaultColor, setColorThings }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(defaultColor);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (colored) => {
    setColor(colored);
    setColorThings(colored.rgb);
    console.log("Colored.rgb is: ", colored.rgb);
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
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
