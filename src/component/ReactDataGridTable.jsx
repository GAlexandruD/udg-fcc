import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import DataGrid, { SelectColumn, TextEditor } from "react-data-grid";

const ReactDataGridTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    console.log({ data });
  }, [data]);

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
      key: element,
      name: element,
    }));

    const rows = list.map((element, index) => ({
      ...element,
      id: index,
    }));

    setData(rows);
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

  function rowKeyGetter(row) {
    return row.id;
  }

  // const memoizedRows = useMemo(() => rows, [rows]);

  return (
    <div className="container">
      <h3>Read CSV file in React </h3>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      <div className="container w-screen h-screen">
        <DataGrid columns={columns} rows={data} className="text-slate-800" />
      </div>
    </div>
  );
};

export default ReactDataGridTable;
