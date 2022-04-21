import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Table,
  Container,
  Modal,
} from "react-bootstrap";
import "./App.css";
import * as XLSX from "xlsx";
import db from "./firebase";
function App() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleClose = () => {
    resetModal();
  };
  const handleShow = () => setShow(true);

  const processSheetData = (excelData) => {
    const wsname = excelData.SheetNames[0];
    const ws = excelData.Sheets[wsname];
    const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
    let csv = [];
    let headers = [];
    for (let i = 0; i < dataParse.length; i++) {
      if (dataParse[i] === "") continue;
      let fields = dataParse[i];
      if (i === 0) {
        headers = fields;
      } else {
        let csvRow = [];
        for (let field of fields) {
          if (!isNaN(field)) field = Number(field);
          csvRow.push(field);
        }
        csv.push(csvRow);
      }
    }
    setHeaders(headers);
    setRows(csv);
  };
  const handleFileUpload = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      processSheetData(readedData);
    };
    reader.readAsBinaryString(file);
  };
  const resetModal = () => {
    setShow(false);
    setHeaders([]);
    setRows([]);
  };
  const handleSubmit = () => {
    let batch = db.batch();
    const formattedValues = rows.map((row) => {
      return { name: row[0], age: row[1] };
    });
    formattedValues.forEach((userRow) => {
      batch.set(db.collection("users").doc(), userRow);
    });
    batch.commit().then(function () {
      fetchUsers();
      resetModal();
    });
  };
  const fetchUsers = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setUsers(data);
      });
  };
  return <div>Firebase Firestore Import Demo</div>;
}
export default App;
