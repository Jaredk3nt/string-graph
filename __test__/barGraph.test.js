const barGraph = require('../lib/barGraph');
const {
  simple,
  givenHeight,
  givenToken,
  givenColumnWidth,
  givenColumnSpacing,
  givenYLabels,
  givenYLabelsAndUnit,
  givenYLabelCount,
  givenUnevenYLabelCount,
  givenXLabels,
  givenXLabelWidth,
  givenXLabelsAndYLabels,
} = require('./testGraphs');
const testGraphData = [5, 10, 15];
const testGraphDataX = [
  { data: 5, label: 'one' },
  { data: 10, label: 'two' },
  { data: 15, label: 'three' },
];

describe('barGraph', () => {
  test('Default options', () => {
    expect(barGraph(testGraphData)).toEqual(simple);
  });

  test('Given "height" option', () => {
    expect(barGraph(testGraphData, { height: 10 })).toEqual(givenHeight);
  });

  test('Given "token" option', () => {
    expect(barGraph(testGraphData, { token: '-' })).toEqual(givenToken);
  });

  test('Given "columnWidth" option', () => {
    expect(barGraph(testGraphData, { columnWidth: 2 })).toEqual(
      givenColumnWidth
    );
  });

  test('Given "columnSpacing" option', () => {
    expect(barGraph(testGraphData, { columnSpacing: 2 })).toEqual(
      givenColumnSpacing
    );
  });

  test('Given "yLabels" option', () => {
    expect(barGraph(testGraphData, { yLabels: true })).toEqual(givenYLabels);
  });

  test('Given "yLabelsCount" option', () => {
    expect(barGraph(testGraphData, { yLabels: true, yLabelCount: 3 })).toEqual(
      givenYLabelCount
    );
  });

  test('Given uneven "yLabelsCount" option', () => {
    expect(barGraph(testGraphData, { yLabels: true, yLabelCount: 6 })).toEqual(
      givenUnevenYLabelCount
    );
  });

  test('Given "yLabels" and "unit" option', () => {
    expect(barGraph(testGraphData, { yLabels: true, unit: 'ms' })).toEqual(
      givenYLabelsAndUnit
    );
  });

  test('Given object data with labels', () => {
    expect(barGraph(testGraphDataX)).toEqual(givenXLabels);
  });

  test('Given object data with labels and "xLabelWidth" option', () => {
    expect(barGraph(testGraphDataX, { xLabelWidth: 3 })).toEqual(
      givenXLabelWidth
    );
  });

  test('Given object data with labels and "yLabels" option', () => {
    expect(barGraph(testGraphDataX, { yLabels: true })).toEqual(
      givenXLabelsAndYLabels
    );
  });
});
