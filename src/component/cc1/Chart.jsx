import { useEffect, useState } from "react";

import Chart from "react-google-charts";

const Charts = ({
  chartData,
  selectedColumnForChart,
  handleColumnChangeForChart,
  columns,
  pendingChart,
}) => {
  const [limitChartData, setLimitChartData] = useState("10");
  const [googleChartData, setGoogleChartData] = useState([]);
  const [toggleChartType, setToggleChartType] = useState("pie");

  //Prepare data for chart

  useEffect(() => {
    const googleNewData = () => {
      const arrayToReturn = [["Content", selectedColumnForChart]];
      if (limitChartData === "all") {
        chartData.map(([key, value]) => arrayToReturn.push([key, value]));
      } else {
        chartData
          .slice(0, Number(limitChartData))
          .map(([key, value]) => arrayToReturn.push([key, value]));
      }
      return arrayToReturn;
    };

    console.log({ chartData });

    setGoogleChartData(googleNewData());
  }, [limitChartData, toggleChartType, selectedColumnForChart, chartData]);

  return googleChartData.length > 0 ? (
    <div className="w-full h-auto flex flex-col justify-center place-items-center">
      <div className="flex flex-col md:flex-row justify-center place-items-center">
        <button
          className="m-2 p-4 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-md focus:border-0"
          onClick={() =>
            toggleChartType === "pie"
              ? setToggleChartType("bar")
              : setToggleChartType("pie")
          }
        >
          Showing {toggleChartType === "pie" ? "Pie" : "Bar"} Chart
        </button>

        <div className="flex justify-center place-items-center md:mx-6 m-2">
          <label
            htmlFor="column"
            className="bg-gray-100 text-md text-indigo-700 p-1 rounded"
          >
            Limit results to:
          </label>
          <select
            id="columns"
            name="columns"
            defaultChecked={"10"}
            className="border border-grey-400 rounded p-1 text-md bg-white text-indigo-700 focus:outline-none"
            onChange={(e) => setLimitChartData(e.target.value)}
          >
            {["10", "20", "30", "40", "50", "all"].map((column, index) => (
              <option value={column} key={index}>
                {column}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center place-items-center m-2">
          <label
            htmlFor="column"
            className="bg-gray-100 text-md text-indigo-700 p-1 rounded"
          >
            Chart for:
          </label>
          <select
            id="columns"
            name="columns"
            defaultChecked={selectedColumnForChart}
            className="border border-grey-400 rounded text-indigo-700 bg-white p-1 focus:outline-none"
            onChange={(e) => handleColumnChangeForChart(e)}
          >
            {columns.map((column, index) => (
              <option value={column.Header} key={index}>
                {column.Header}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="h-full w-full flex flex-col bg-green-400/20 justify-center place-items-center"
        id="charts"
      >
        {toggleChartType === "pie" ? (
          <Chart
            chartType="PieChart"
            data={googleChartData}
            options={{ title: `Selection: ${selectedColumnForChart}` }}
            width="100%"
            height="400px"
          />
        ) : (
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={googleChartData}
          />
        )}
      </div>
    </div>
  ) : pendingChart ? (
    <p className="text-center">Loading chart...</p>
  ) : (
    <p className="text-center">*** No data to show chart ***</p>
  );
};

export default Charts;
