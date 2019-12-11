const { barGraph } = require('./lib/');

const testBarGraphData = [5, 10 , 15];
console.log(
  barGraph(testBarGraphData, { yLabels: true, yLabelCount: 3 })
);