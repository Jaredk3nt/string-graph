const { scatterPlot } = require("./lib");

console.log(
  scatterPlot([
    [2, 2],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 5],
    [15, 5],
    [6, 6],
    [2, 8],
    [8, 4],
    [6, 5]
  ], {
    yLabels: true,
    yLabelCount: 3,
    xLabels: true,
    xLabelCount: 5,
    guides: false
  })
);
