import React from "react";

const Slider = ({ value, min, max, step, onChange, ...props }) => {
  return (
    <div className="ml-8 p-6 flex flex-row">
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Default
      </label>
      <input
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};

export default Slider;
