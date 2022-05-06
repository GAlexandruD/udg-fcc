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

  const chartTable = Object.entries(chartData);
  const [googleChartData, setGoogleChartData] = useState([]);
  const [toggleChartType, setToggleChartType] = useState("pie");

  //Prepare data for chart

  useEffect(
    () => {
      const googleNewData = () => {
        const arrayToReturn = [["Column", selectedColumnForChart]];
        if (limitChartData === "all") {
          chartTable.map(([key, value]) => arrayToReturn.push([key, value]));
        } else {
          chartTable
            .slice(0, Number(limitChartData))
            .map(([key, value]) => arrayToReturn.push([key, value]));
        }
        return arrayToReturn;
      };

      setGoogleChartData(googleNewData());
    },
    [limitChartData, toggleChartType],
    selectedColumnForChart
  );

  return googleChartData.length > 0 ? (
    <div className="w-full h-auto flex flex-col justify-center place-items-center">
      <div className="bg-green-400">
        <label htmlFor="column" className="text-xl text-gray-700 m-2 ">
          Chart for:
        </label>
        <select
          id="columns"
          name="columns"
          defaultChecked={selectedColumnForChart}
          className="w-min h-8 p-1 mb-6 border border-gray-400/80 rounded-lg text-gray-800"
          onChange={(e) => handleColumnChangeForChart(e)}
        >
          {columns.map((column, index) => (
            <option value={column.Header} key={index}>
              {column.Header}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-red-400">
        <label htmlFor="column" className="text-xl text-gray-700 m-2 ">
          Limit results to:
        </label>
        <select
          id="columns"
          name="columns"
          defaultChecked={"10"}
          className="w-min h-8 p-1 mb-6 border border-gray-400/80 rounded-lg text-gray-800"
          onChange={(e) => setLimitChartData(e.target.value)}
        >
          {["10", "20", "30", "40", "50", "all"].map((column, index) => (
            <option value={column} key={index}>
              {column}
            </option>
          ))}
        </select>
      </div>

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
            options={{ title: `Selection: ${selectedColumnForChart}` }}
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
