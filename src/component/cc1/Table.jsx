import { useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useBlockLayout,
  useResizeColumns,
} from "react-table";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import * as XLSX from "xlsx";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed externally, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="w-full bg-transparent focus:bg-yellow-100 hover:bg-gray-200 focus:outline-none"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

function Table({
  columns,
  data,
  updateMyData,
  skipPageReset,
  sorting,
  resetData,
  onSortingChange,
  constructAnotherRow,
  toggleCharts,
  showCharts,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout,
    useResizeColumns
  );
  const downloadCsv = (json, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    XLSX.writeFile(workbook, fileName, { bookType: "csv" });
  };

  return (
    <div className="flex flex-col justify-center place-items-center">
      <div className="flex pb-2">
        <div className="flex flex-col md:flex-row">
          <button
            className="p-4 m-2 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-md"
            type="button"
            onClick={() => constructAnotherRow()}
          >
            New Row
          </button>

          <button
            className=" p-4 m-2 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-md"
            type="button"
            onClick={resetData}
          >
            Reset Data
          </button>
          <button
            onClick={onSortingChange}
            className="bg-gray-200 m-2 p-4 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-md"
            type="button"
          >
            Sorting: {`${sorting ? "Yes" : "No "}`}
          </button>
          <button
            onClick={() => downloadCsv(data, "itworks.csv")}
            className="m-2 p-4 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-md"
          >
            Download csv
          </button>
        </div>
      </div>
      <div className="shadow-md w-full overflow-x-scroll flex place-items-center">
        <div className="flex bg-green-700/30 mx-auto">
          <table
            className="max-w-4xl m-2 text-sm text-left text-gray-500"
            {...getTableProps()}
          >
            <thead className="text-xs text-gray-700 uppercase">
              {headerGroups.map((headerGroup) => (
                <tr className="" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      scope="col"
                      {...column.getHeaderProps(
                        sorting ? column.getSortByToggleProps() : ""
                      )}
                      className="bg-gray-200 px-4 py-2"
                    >
                      <span className="">
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <IoIosArrowDown />
                            ) : (
                              <IoIosArrowUp />
                            )
                          ) : (
                            <IoIosArrowUp className="invisible" />
                          )}
                        </span>
                        <span
                          {...column.getResizerProps()}
                          className={`touch-none inline-block bg-gray-500 w-[1px] h-full absolute right-0 top-0 translate-x-1/2 z-10 ${
                            column.isResizing ? "bg-red-500 w-1" : ""
                          }`}
                        ></span>
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="table-row-group" {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    className="bg-yellow-50 border-b  hover:bg-gray-50 "
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="relative min-w-[60px] px-3 py-2 border"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="py-2 w-full flex flex-col sm:flex-row items-center justify-center">
        <div id="goToPage">
          <p className="text-base text-gray-600 ">
            Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "50px" }}
            />
          </p>
        </div>
        <div className="flex flex-row sm:border-l sm:border-r border-gray-300  py-3 sm:py-0 sm:px-6">
          <p
            className="text-base text-gray-600 dark:text-gray-400"
            id="page-view"
          >
            Page {pageIndex + 1} of {pageOptions.length}
          </p>
          <button
            className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
          <button
            className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
        <div className="relative w-32 z-10">
          <div className="pointer-events-none text-gray-600 absolute inset-0 m-auto mr-2 xl:mr-4 z-0 w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon cursor-pointer icon-tabler icon-tabler-chevron-down"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <select
            aria-label="Selected tab"
            className="focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 appearance-none bg-transparent"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="m-2 p-4 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-md focus:border-0"
        onClick={toggleCharts}
      >
        {showCharts ? "Hide" : "Show"} Chart
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-3 transition-all duration-1000 ${
            showCharts ? "rotate-180" : null
          }`}
          width={28}
          height={28}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}

export default Table;
