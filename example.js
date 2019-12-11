const { barGraph } = require('./lib');
const test = [
  { label: 'morning', data: 6 },
  { label: 'midday', data: 0 },
  { label: 'early afternoon', data: 2 },
  { label: 'afternoon', data: 10 },
  { label: 'evening', data: 1 },
];

console.log(
  barGraph(test, { xLabelWidth: 7, columnWidth: 6, yLabels: true })
)