const LabelSelect = ({
  labelText,
  onChange,
  selectFields,
  defaultChecked,
  id,
}) => {
  return (
    <div className="flex justify-center place-items-center m-2 shadow-md shadow-green-800 rounded">
      <label
        htmlFor={id}
        className="bg-green-700 py-1 text-md text-yellow-50 h-8 px-2 rounded-tl rounded-bl"
      >
        {labelText}
      </label>
      <span className="bg-green-600 hover:bg-green-500 h-8 rounded-tr rounded-br ">
        <select
          id={id}
          name={id}
          defaultChecked={defaultChecked}
          className="border-transparent rounded-tr rounded-br bg-transparent text-md text-yellow-50 focus:outline-none px-3 h-8 "
          onChange={onChange}
        >
          {selectFields}
        </select>
      </span>
    </div>
  );
};

export default LabelSelect;
