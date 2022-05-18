import { useRef } from "react";

const TopBar = ({ fileName, handleFileUpload, pending }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div className=" w-full flex flex-col text-center place-items-center justify-center">
        <div className="w-full h-full">
          <div
            onClick={handleClick}
            className="hover:cursor-pointer rounded-full px-6 w-48 h-48 mx-auto mt-8 flex flex-col justify-center place-items-center border-4 bg-zinc-600 border-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 stroke-green-500 bg-transparent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>

            <hr className="w-full border-green-600 mt-2" />
            <p className="text-xs mt-3 text-green-400 bg-transparent">
              {fileName ? "Load another file" : "Load a file"}
            </p>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleFileUpload}
              accept=".csv,.xlsx,.xls"
              style={{ display: "none" }}
            />
          </div>
        </div>

        <ul className="w-10/12 py-4 text-left sm:text-center m-2">
          <li>- Cells can be edited by clicking inside the cell</li>
          <li>
            - All unwanted changes can be undone by pressing "Reset Data" button
          </li>
          <li className="">
            - To sort press the "Sorting" button and any column header
          </li>
        </ul>

        <h1 className="text-3xl pt-4 pb-2 ">
          {fileName
            ? pending
              ? "Loading..."
              : fileName
            : "Start by importing a csv file..."}
        </h1>
      </div>
    </>
  );
};

export default TopBar;
