import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const ImpFileReactTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [pending, setPending] = useState(true);

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
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
    { columns, data, initialState: { pageIndex: 0 } },
    useFilters,
    useSortBy,
    usePagination
  );

  // const memoizedRows = useMemo(() => rows, [rows]);

  return (
    <div className="w-full bg-orange-300">
      <div id="input" className="w-screen text-center">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>

      {
        /////////////////////////////////////////////////////////////////////////////
      }

      <div className="flex w-full h-full bg-fuchsia-200 ">
        <div className="bg-green-400 border-8 border-blue-700 mx-auto">
          <table className="table max-w-4xl" {...getTableProps()}>
            <thead className="table-header-group relative">
              {headerGroups.map((headerGroup) => (
                <tr className="" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="table-cell bg-slate-300 sticky top-0"
                    >
                      <span>
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
                  <tr className="table-row" {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="table-cell pr-2 bg-slate-200 border border-slate-300"
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

      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      <div className="p-1 bg-red-200 fixed bottom-0 w-full text-center">
        <button
          className="sm:p-1 bg-gray-400 border border-gray-500 rounded-l-full"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="sm:p-1 bg-gray-400 border border-gray-500 mx-1"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="sm:p-1 bg-gray-400 border border-gray-500 mr-1"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="sm:p-1 bg-gray-400 border border-gray-500 rounded-r-full"
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
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
  );
};

export default ImpFileReactTable;
