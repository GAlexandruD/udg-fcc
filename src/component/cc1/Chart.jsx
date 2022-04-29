import {
  VictoryBar,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
} from "victory";

const Chart = ({
  chartData,
  selectedColumnForChart,
  setSelectedColumnForChart,
  columns,
}) => {
  const chartTable = Object.entries(chartData);

  //Prepare data for chart
  const modifiedChartData = chartTable.map(([key, value], index) => {
    //limit the number of data points
    return index > 999 ? null : { x: key, y: value };
  });

  return modifiedChartData.length > 0 ? (
    <div className="w-full h-auto flex flex-col justify-center place-items-center">
      <>
        <label htmlFor="column" className="text-xl text-gray-700 m-2 ">
          Displaying data for:
        </label>
        <select
          id="columns"
          name="columns"
          defaultChecked={selectedColumnForChart}
          className="w-min h-8 p-1 mb-6 border border-gray-400/80 rounded-lg text-gray-800"
          onChange={(e) => {
            setSelectedColumnForChart(e.target.value);
          }}
        >
          {columns.map((column, index) => (
            <option value={column.Header} key={index}>
              {column.Header}
            </option>
          ))}
        </select>
      </>
      <div
        className="h-full w-full flex flex-col sm:flex-row bg-green-400/20 justify-center place-items-center"
        id="charts"
      >
        <div className="h-full flex flex-col place-items-center border-b-2 sm:border-r-2 sm:border-b-0">
          <VictoryPie
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            theme={VictoryTheme.material}
            labelComponent={
              <VictoryTooltip containerComponent={<VictoryZoomContainer />} />
            }
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={modifiedChartData}
          />
        </div>

        <div className="h-full flex flex-col place-items-center">
          <VictoryBar
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
              />
            }
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={modifiedChartData}
          />
        </div>
      </div>
    </div>
  ) : (
    <p>No data to show</p>
  );
};

export default Chart;
