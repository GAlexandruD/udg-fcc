import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

import Table from "./Table";
import TopBar from "./TopBar";
import CreateRowModal from "./CreateRowModal";
import Charts from "./Chart";

const ImpFileReactTable = () => {
  const [unmemoizedColumns, setUnmemoizedColumns] = useState([]);

  const columns = useMemo(() => unmemoizedColumns, [unmemoizedColumns]);

  const [unmemoizedData, setUnmemoizedData] = useState([]); // Array of rows to memoize
  const data = useMemo(() => unmemoizedData, [unmemoizedData]); // Array of rows})
  const [originalData, setOriginalData] = useState(); // Array of rows (original)
  const [skipPageReset, setSkipPageReset] = useState(false); // Flag to skip resetting page
  const [sorting, setSorting] = useState(false); // Flag to sort by column
  const inputEl = useRef({}); // Input element
  const [toggle, setToggle] = useState(false); // Flag to toggle modal visibility
  const [chartData, setChartData] = useState({}); // Chart data
  const [selectedColumnForChart, setSelectedColumnForChart] = useState(""); // Selected column for chart
  const [showCharts, setShowCharts] = useState(false); // Flag to show charts

  const [fileName, setFileName] = useState(null); // File name
  const [pending, setPending] = useState(false); // Flag to show loading
  const [pendingChart, setPendingChart] = useState(false); // Flag to show loading of chart

  const onSortingChange = () => {
    setSorting(!sorting);
  };

  const toggleCharts = () => {
    setShowCharts(!showCharts);
    if (!pendingChart) {
      setPendingChart(true);
    }
  };

  const handleColumnChangeForChart = (e) => {
    if (e.target.value && e.target.value !== selectedColumnForChart) {
      setPendingChart(true);
      setSelectedColumnForChart(e.target.value);
    }
  };

  //Set the data for chart:
  useEffect(() => {
    if (data.length > 0) {
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

      // setPendingChart(false);
    }
  }, [data, selectedColumnForChart]);

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
    setUnmemoizedData(list);

    setOriginalData(list);
    setUnmemoizedColumns(columns);
    setSelectedColumnForChart(columns[1].accessor);

    setPending(false);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setPending(true);
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
    setUnmemoizedData((old) =>
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

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setUnmemoizedData(originalData);

  // I am returning a new row
  const constructAnotherRow = () => {
    const array = [];
    columns.map((column) => {
      return array.push(column.accessor);
    });
    array.map((element) => {
      return (inputEl.current[element] = "");
    });

    setToggle(true);
  };

  const toggleModal = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <TopBar
        fileName={fileName}
        handleFileUpload={handleFileUpload}
        pending={pending}
      />

      {data.length === 0 ? (
        <div className="text-center">*** No data loaded ***</div>
      ) : (
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
          toggleCharts={toggleCharts}
          showCharts={showCharts}
        />
      )}

      {showCharts ? (
        <Charts
          selectedColumnForChart={selectedColumnForChart}
          handleColumnChangeForChart={handleColumnChangeForChart}
          chartData={chartData}
          columns={columns}
          pendingChart={pendingChart}
        />
      ) : null}

      <CreateRowModal
        columns={columns}
        inputEl={inputEl}
        data={data}
        setData={setUnmemoizedData}
        toggleModal={toggleModal}
        toggle={toggle}
      />
    </>
  );
};

export default ImpFileReactTable;
