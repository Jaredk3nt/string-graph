const { barGraph } = require('./lib');
const test = [
  { label: 'first', data: 10 },
  { label: 'second', data: 18 },
  { label: 'third', data: 12 },
  { label: 'fourth', data: 4 },
  { label: 'fifth', data: 8 },
];

console.log(
  barGraph(test, { xLabelWidth: 6, columnWidth: 6, yLabels: true })
)