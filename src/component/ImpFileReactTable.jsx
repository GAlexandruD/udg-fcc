import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useBlockLayout,
  useResizeColumns,
} from "react-table";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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

  // If the initialValue is changed external, sync it up with our state
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

function Table({ columns, data, updateMyData, skipPageReset, sorting }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    resetResizing,
    setFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
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

  return (
    <donotforgettoturnitbacktoreactfragment>
      <div className="relative shadow-md sm:rounded-lg bg-green-400 m-2 mx-auto">
        <table
          className="max-w-4xl m-2 text-sm text-left text-gray-500 dark:text-gray-400 mb-10"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr
                className="sticky top-0"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    {...column.getHeaderProps(
                      sorting ? column.getSortByToggleProps() : ""
                    )}
                    className="bg-gray-200 min-w-[60px] px-4 py-2"
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
                  className="bg-yellow-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
      <div className="fixed bottom-0 flex flex-col lg:flex-row p-2 justify-between items-start lg:items-stretch w-full">
        <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
          <div className="flex items-center">
            <a
              className="text-gray-600 dark:text-gray-400 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon cursor-pointer icon-tabler icon-tabler-edit"
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
                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1={16} y1={5} x2={19} y2={8} />
              </svg>
            </a>
            <a
              className="text-gray-600 dark:text-gray-400 mx-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon cursor-pointer icon-tabler icon-tabler-settings"
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
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            </a>
            <a
              className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-bookmark"
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
                <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
              </svg>
            </a>
            <a
              className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-copy"
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
                <rect x={8} y={8} width={12} height={12} rx={2} />
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
              </svg>
            </a>
            <a
              className="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon cursor-pointer icon-tabler icon-tabler-trash"
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
                <line x1={4} y1={7} x2={20} y2={7} />
                <line x1={10} y1={11} x2={10} y2={17} />
                <line x1={14} y1={11} x2={14} y2={17} />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </a>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "50px" }}
              />
            </span>{" "}
          </div>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
          <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
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
          <div className="flex items-center lg:border-r border-gray-300 dark:border-gray-200 pb-3 lg:pb-0 lg:px-6">
            <div className="relative w-32 z-10">
              <div className="pointer-events-none text-gray-600 dark:text-gray-400 absolute inset-0 m-auto mr-2 xl:mr-4 z-0 w-5 h-5">
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
                className="focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 dark:text-gray-400 appearance-none bg-transparent"
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
          <div className="lg:ml-6 flex items-center">
            <button className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm">
              Download csv
            </button>
            <div className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
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
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </donotforgettoturnitbacktoreactfragment>
  );
}

const ImpFileReactTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState();
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [sorting, setSorting] = useState(false);
  const inputEl = useRef({});
  const [toggle, setToggle] = useState(false);

  const [fileName, setFileName] = useState(null);
  const [pending, setPending] = useState(true);

  const onSortingChange = () => {
    setSorting(!sorting);
  };

  // useEffect(() => {
  //   console.log({ data });
  // }, [data]);

  // useEffect(() => {
  //   console.log({ columns });
  // }, [columns]);

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((element) => ({
      Header: element,
      accessor: element,
    }));
    setData(list);
    setOriginalData(list);
    // const memoizedRows = useMemo(() => rows, [rows]);
    setColumns(columns);

    setPending(false);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        /* Parse data */
        const bstr = event.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  // I am returning a new row
  const constructAnotherRow = () => {
    const array = [];
    columns.map((column) => {
      return array.push(column.accessor);
    });
    array.map((element) => {
      return (inputEl.current[element] = "");
    });
    console.log(inputEl);

    setToggle(true);
  };

  const toggleModal = () => {
    setToggle(!toggle);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-screen text-center place-items-center">
        <h1 className="text-3xl pt-4">Start by importing a csv file...</h1>
        <ul className="py-4">
          <li>Sorting is done by pressing on each column header</li>
          <li>Cells can be edited by clicking each inside</li>
        </ul>
        <input
          className="mt-4 p-1 border border-gray-400 rounded-lg"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>

      <button onClick={resetData}>Reset Data</button>
      <button onClick={onSortingChange} className="ml-4">
        Sorting: {`${sorting ? "Yes" : "No"}`}
      </button>
      <button className="ml-4" onClick={() => constructAnotherRow()}>
        Add another Row
      </button>

      {
        // <!-- Modal toggle -->
      }

      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={toggleModal}
      >
        Toggle modal
      </button>

      {
        // <!-- Main modal -->
      }
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`${
          toggle ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          {
            // <!-- Modal content -->
          }
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
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
              {columns.map((column) => {
                return (
                  <div className="space-y-4">
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

              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Add data to the end of the table
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setData([inputEl.current, ...data]);
                  toggleModal();
                }}
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add row with data
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {
        /////////////////////////////////////////////////////////////////////////////
      }

      <div className="flex w-full h-full ">
        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          sorting={sorting}
        />
      </div>

      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      {
        //   <div className="p-1 bg-red-200 fixed top-0 w-full text-center">
        //   <button
        //     className="sm:p-1 bg-gray-400 border border-gray-500 rounded-l-full"
        //     onClick={() => gotoPage(0)}
        //     disabled={!canPreviousPage}
        //   >
        //     {"|<"}
        //   </button>{" "}
        //   <button
        //     className="sm:p-1 bg-gray-400 border border-gray-500 mx-1"
        //     onClick={() => previousPage()}
        //     disabled={!canPreviousPage}
        //   >
        //     {"<"}
        //   </button>{" "}
        //   <button
        //     onClick={() => nextPage()}
        //     disabled={!canNextPage}
        //     className="sm:p-1 bg-gray-400 border border-gray-500 mr-1"
        //   >
        //     {">"}
        //   </button>{" "}
        //   <button
        //     onClick={() => gotoPage(pageCount - 1)}
        //     disabled={!canNextPage}
        //     className="sm:p-1 bg-gray-400 border border-gray-500 rounded-r-full"
        //   >
        //     {">|"}
        //   </button>{" "}
        //   <span>
        //     Page{" "}
        //     <strong>
        //       {pageIndex + 1} of {pageOptions.length}
        //     </strong>{" "}
        //   </span>
        //   <span>
        //     | Go to Wpage:{" "}
        //     <input
        //       type="number"
        //       defaultValue={pageIndex + 1}
        //       onChange={(e) => {
        //         const page = e.target.value ? Number(e.target.value) - 1 : 0;
        //         gotoPage(page);
        //       }}
        //       style={{ width: "50px" }}
        //     />
        //   </span>{" "}
        //   <select
        //     className="focus:outline-none border  focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 dark:text-gray-400 appearance-none"
        //     value={pageSize}
        //     onChange={(e) => {
        //       setPageSize(Number(e.target.value));
        //     }}
        //   >
        //     {[10, 20, 30, 40, 50].map((pageSize) => (
        //       <option key={pageSize} value={pageSize}>
        //         Show {pageSize}
        //       </option>
        //     ))}
        //   </select>
        // </div>
      }
    </div>
  );
};

export default ImpFileReactTable;
