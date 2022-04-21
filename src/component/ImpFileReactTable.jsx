import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

import Table from "../component/Table";
import TopBar from "./TopBar";
import CreateRowModal from "./CreateRowModal";
import Chart from "./Chart";

import { loadedColumns, loadedList } from "../csvs/csvData.js";

const ImpFileReactTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState();
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [sorting, setSorting] = useState(false);
  const inputEl = useRef({});
  const [toggle, setToggle] = useState(false);
  const [chartData, setChartData] = useState({});
  const [selectedColumnForChart, setSelectedColumnForChart] =
    useState("Hersteller");

  const [fileName, setFileName] = useState(null);
  const [pending, setPending] = useState(true);

  const onSortingChange = () => {
    setSorting(!sorting);
  };

  useEffect(() => {
    //Set the data for chart:

    //1. Get the data from the table by column name
    const columnArray = data.map((item) => {
      return item[selectedColumnForChart]; //returns an array of values
    });

    //2. A function to find all distinct occurences of the object property, sorted by key, in the data array

    const myArray = columnArray.reduce(function (accumulator, currentValue) {
      return (
        accumulator[currentValue]
          ? ++accumulator[currentValue]
          : (accumulator[currentValue] = 1),
        accumulator
      );
    }, {});

    setChartData(myArray);
  }, [data, selectedColumnForChart]);

  useEffect(() => {
    console.log({ columns });
    console.log({ chartData });

    // columns.map((column) => {
    //   console.log(column.accessor);
    // });
  }, [columns, chartData]);

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
    console.log({ list });
    setOriginalData(list);
    // const memoizedRows = useMemo(() => rows, [rows]);
    setColumns(columns);

    setPending(false);
  };

  //Auto loading some data to work for in development
  useEffect(() => {
    setFileName("Artikel.csv");
    setData(loadedList);
    setColumns(loadedColumns);
    setOriginalData(loadedList);
  }, []);

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        /* Parse data */
        const bstr = event.target.result;
        /* Read csv/excel file */
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
    <div className="w-full flex flex-col">
      <TopBar fileName={fileName} handleFileUpload={handleFileUpload} />

      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        sorting={sorting}
        resetData={resetData}
        onSortingChange={onSortingChange}
        constructAnotherRow={constructAnotherRow}
        toggleModal={toggleModal}
      />

      {chartData ? (
        <Chart
          selectedColumnForChart={selectedColumnForChart}
          setSelectedColumnForChart={setSelectedColumnForChart}
          chartData={chartData}
          columns={columns}
        />
      ) : null}

      <CreateRowModal
        columns={columns}
        inputEl={inputEl}
        data={data}
        setData={setData}
        toggleModal={toggleModal}
        toggle={toggle}
      />

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
