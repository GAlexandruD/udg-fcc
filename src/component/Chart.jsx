import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
  VictoryScatter,
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
  //   const keys = Object.keys(chartData);
  //   console.log({ keys });
  const chartTable = Object.entries(chartData);

  const modifiedChartData = chartTable.map(([key, value], index) => {
    return index > 999 ? null : { x: key, y: value };
  });

  console.log({ modifiedChartData });
  console.log(modifiedChartData.length);

  const data = [
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 },
  ];

  const sweet = "VictoryBar";

  return modifiedChartData.length > 0 ? (
    <div className="w-full h-1/2 flex justify-center place-items-center">
      <>
        <label htmlFor="column" className="text-xl">
          {selectedColumnForChart}
        </label>
        <select
          id="columns"
          name="columns"
          defaultChecked={selectedColumnForChart}
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
      <div className="h-full flex flex-col place-items-center mt-4">
        <div className="text-center">
          <p>Displaying data for:</p>
          <p className="font-bold">{selectedColumnForChart}</p>
        </div>
        <VictoryPie
          title="PIEEEEEE"
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
      <div className="h-full flex flex-col place-items-center mt-4">
        <div className="text-center">
          <p>Displaying data for:</p>
          <p className="font-bold">{selectedColumnForChart}</p>
        </div>
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
      {
        //       <div className="h-96">
        //     <VictoryChart
        //       containerComponent={<VictoryZoomContainer />}
        //       theme={VictoryTheme.grayscale}
        //     >
        //       <VictoryScatter
        //         animate={{
        //           duration: 2000,
        //           onLoad: { duration: 1000 },
        //         }}
        //         data={modifiedChartData}
        //       />
        //     </VictoryChart>
        //   </div>
      }
      {
        //   <div className="w-screen h-screen relative top-0 ">
        //     {chartTable.map(([key, value], index) => {
        //       return index > -1 ? null : (
        //         <div key={index}>
        //           <span>{key}: </span>
        //           <span>{value}</span>
        //         </div>
        //       );
        //     })}
        //   </div>
      }
    </div>
  ) : (
    <p>No data to show</p>
  );
};

export default Chart;
