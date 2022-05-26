import { useState } from "react";
import MyButton from "./MyButton";

const CreateRowModal = ({
  columns,
  inputEl,
  data,
  setData,
  toggleModal,
  toggle,
}) => {
  const [atTheEnd, setAtTheEnd] = useState(false);
  return (
    <div
      hidden={!toggle}
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 z-50 w-max h-full shadow-lg overflow-y-scroll"
    >
      <div className="relative rounded-lg shadow">
        <div className="flex justify-end p-2 bg-transparent">
          <button
            onClick={toggleModal}
            type="button"
            className="rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="new-row-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form
          className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
          action="#"
        >
          <MyButton
            onClick={(e) => {
              e.preventDefault();
              atTheEnd
                ? setData([...data, inputEl.current])
                : setData([inputEl.current, ...data]);
              inputEl.current = {};
              toggleModal();
            }}
            type="submit"
            text="Add row"
          />

          {columns.map((column, index) => {
            return (
              <div key={index} className="space-y-4">
                <div className="relative">
                  <input
                    onChange={(e) =>
                      (inputEl.current[column.accessor] = e.target.value)
                    }
                    id={column.accessor}
                    name={column.accessor}
                    type="text"
                    placeholder={column.Header}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                  />
                  <label
                    htmlFor={column.accessor}
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    {column.Header}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  onChange={() => {
                    setAtTheEnd(!atTheEnd);
                  }}
                  id="end"
                  aria-describedby="end"
                  type="checkbox"
                  className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="end" className="font-medium">
                  To the end of the table
                </label>
              </div>
            </div>
          </div>

          <MyButton
            onClick={(e) => {
              e.preventDefault();
              atTheEnd
                ? setData([...data, inputEl.current])
                : setData([inputEl.current, ...data]);
              inputEl.current = {};
              toggleModal();
            }}
            type="submit"
            text="Add row"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateRowModal;
