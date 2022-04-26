const TopBar = ({ fileName, handleFileUpload }) => {
  return (
    <>
      <div className=" w-screen flex flex-col text-center place-items-center">
        <h1 className="text-3xl pt-4">
          {fileName ? fileName : "Start by importing a csv file..."}
        </h1>
        <ul className="w-10/12 py-4 list-disc text-left m-2">
          <li>Cells can be edited by clicking inside the cell</li>
          <li>
            All unwanted changes can be undone by pressing "Reset Data" button
          </li>
          <li className="">
            To sort press the "Sorting" button and any column header
          </li>
        </ul>
        <input
          className="mt-4 p-1 border border-gray-400/80 rounded-lg"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>
    </>
  );
};

export default TopBar;
