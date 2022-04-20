import { useState } from "react";

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
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        toggle ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-end p-2 bg-transparent">
            <button
              onClick={toggleModal}
              type="button"
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add a new row
            </h3>
            {columns.map((column, index) => {
              return (
                <div key={index} className="space-y-4">
                  <label
                    htmlFor={column.accessor}
                    className="block text-sm font-medium leading-5 text-gray-700 dark:text-white"
                  >
                    {column.Header}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      onChange={(e) =>
                        (inputEl.current[column.accessor] = e.target.value)
                      }
                      id={column.accessor}
                      type="text"
                      className="form-input block w-full sm:text-sm sm:leading-5"
                      placeholder={column.Header}
                    />
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
                  <label
                    htmlFor="end"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    Add data to the end of the table
                  </label>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                atTheEnd
                  ? setData([...data, inputEl.current])
                  : setData([inputEl.current, ...data]);
                toggleModal();
              }}
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add row
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRowModal;
