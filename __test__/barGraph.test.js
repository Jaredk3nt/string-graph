const barGraph = require("../lib/barGraph");
const {
  simple,
  givenHeight,
  givenToken,
  givenColumnWidth,
  givenColumnSpacing,
  givenYLabels,
  givenYLabelCount
} = require("./testGraphs");
const testGraphData = [5, 10, 15];

describe("barGraph", () => {
  test("Default options", () => {
    expect(barGraph(testGraphData)).toEqual(simple);
  });

  test('Given "height" option', () => {
    expect(barGraph(testGraphData, { height: 10 })).toEqual(givenHeight);
  });

  test('Given "token" option', () => {
    expect(barGraph(testGraphData, { token: "-" })).toEqual(givenToken);
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
  
  // TODO: add test for uneven y axis label counts
  test('Given "yLabelsCount" option', () => {
    expect(barGraph(testGraphData, { yLabels: true, yLabelsCount: 3 })).toEqual(
      givenYLabels
    );
  });
});
