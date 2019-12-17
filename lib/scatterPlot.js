const { isObject } = require("./utils");

const yGuide = "┤";
const xGuide = "┬";

function scatterPlot(
  data,
  {
    token = "+",
    yLabels = false,
    xLabels = false,
    yLabelCount = 5,
    xLabelCount = 5,
    lineEnding = "\n"
  } = {}
) {
  // Parse input data
  const dataPoints = parseScatterData(data);
  // Calculate required constants for graph
  const maxY = findMaxPoint(dataPoints, "y");
  const minY = findMinPoint(dataPoints, "y");
  const maxX = findMaxPoint(dataPoints, "x");
  const minX = findMinPoint(dataPoints, "x");
  const height = maxY - minY;
  const width = maxX - minX;
  const yLabelLength = maxY.toString().length;
  const yLabelDistance = height - yLabelCount >= 1 ? height - yLabelCount : 1;
  // Create a map to pull from while create graph to eliminate some cycles
  const dataMap = createPointMap(dataPoints);

  const graph = [];

  // Draw graph
  for (let y = maxY; y >= minY; y--) {
    const line = [];
    // Add Y Labels
    if (yLabels) {
      const showLabel = (y - minY) % yLabelDistance === 0;
      const label = showLabel ? y.toString() : "";
      line.push(label.padStart(yLabelLength, " ") + " ");
    }

    line.push(yGuide);

    // Draw data points
    for (let x = minX; x <= maxX; x++) {
      // TODO: handle duplicates?
      const hasPoint = dataMap[y] && dataMap[y].includes(x);
      line.push(hasPoint ? token : " ");
    }

    // Add line to graph
    graph.push(line.join(""));
  }

  const xOffset = yLabels ? yLabelLength + 2 : 1;
  graph.push("".padStart(xOffset, " ") + "".padEnd(width + 1, xGuide));

  // Add X Labels
  // TODO: work on label distance algo
  if (xLabels) {
    const line = ["".padStart(xOffset, " ")];
    const xLabelLength = maxX.toString().length;
    const xLabelDistance = Math.ceil(width / xLabelCount >= 1 ? width / xLabelCount : 1);
    let x = minX;
    while(x <= maxX) {
      line.push(x.toString().padEnd(xLabelDistance));
      x += xLabelDistance;
    }
    graph.push(
      line.join('')
    );
  }

  return graph.join(lineEnding);
}

/**
 * Data is valid as a tuple or an object with keys "x" and "y"
 * [12, 15] or { x: 12, y: 15 }
 *
 * The easier working state is an object so this function converts
 * all data to object format.
 */
function parseScatterData(data) {
  const parsedData = [];

  data.forEach(point => {
    if (!point) return;

    if (Array.isArray(point) && point.length === 2 && point[0] && point[1]) {
      return parsedData.push({ x: point[0], y: point[1] });
    }

    if (isObject(point) && point.x && point.y) {
      return parsedData.push(point);
    }
  });

  return parsedData;
}

function findMaxPoint(data, axis) {
  let max = data[0][axis];

  data.forEach(point => {
    max = Math.max(max, point[axis]);
  });

  return max;
}

function findMinPoint(data, axis) {
  let min = data[0][axis];

  data.forEach(point => {
    min = Math.min(min, point[axis]);
  });

  return min;
}

function createPointMap(data) {
  const map = {};

  data.forEach(point => {
    if (map[point.y]) {
      return map[point.y].push(point.x);
    }

    map[point.y] = [point.x];
  });

  return map;
}

module.exports = scatterPlot;
