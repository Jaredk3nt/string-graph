const { scatterPlot } = require("./lib");

console.log(
  scatterPlot([
    [200, 12],
    [201, 15],
    [201, 14],
    [202, 14],
    [208, 13]
  ], {
    yLabels: true,
    yLabelCount: 4,
    xLabels: true,
    xLabelCount: 5,
    guides: false
  })
);
