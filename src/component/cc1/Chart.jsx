import { useEffect, useState } from "react";

import Chart from "react-google-charts";
import LabelSelect from "./LabelSelect";
import MyButton from "./MyButton";

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
        <MyButton
          onClick={() =>
            toggleChartType === "pie"
              ? setToggleChartType("bar")
              : setToggleChartType("pie")
          }
          text={<>Showing {toggleChartType === "pie" ? "Pie" : "Bar"} Chart</>}
        />

        <LabelSelect
          onChange={(e) => setLimitChartData(e.target.value)}
          labelText="Limit results to:"
          id="results"
          defaultChecked={"10"}
          selectFields={["10", "20", "30", "40", "50", "all"].map(
            (column, index) => (
              <option value={column} key={index}>
                {column}
              </option>
            )
          )}
        />

        <LabelSelect
          onChange={(e) => handleColumnChangeForChart(e)}
          labelText="Chart for:"
          selectFields={columns.map((column, index) => (
            <option value={column.Header} key={index}>
              {column.Header}
            </option>
          ))}
          defaultChecked={selectedColumnForChart}
          id="columns"
        />
      </div>

      <div
        className="h-full w-full flex flex-col justify-center place-items-center"
        id="charts"
      >
        {toggleChartType === "pie" ? (
          <Chart
            chartType="PieChart"
            data={googleChartData}
            options={{
              title: `Selection: ${selectedColumnForChart}`,
              backgroundColor: "#fefce8",
              is3D: true,
            }}
            width="100%"
            height="400px"
          />
        ) : (
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={googleChartData}
            options={{
              title: `Selection: ${selectedColumnForChart}`,
              backgroundColor: "#fefce8",
              legend: { position: "none" },
              colors: ["#22c55e"],
            }}
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
