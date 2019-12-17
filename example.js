const { scatterPlot } = require("./lib");

console.log(
  scatterPlot([
    [1, 2],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 5],
    [15, 5],
    [6, 6],
    [2, 8]
  ], {
    yLabels: true,
    yLabelCount: 2,
    guides: true
  })
);
