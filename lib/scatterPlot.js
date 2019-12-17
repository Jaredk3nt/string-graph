const { isObject } = require("./utils");

const yGuide = '┤';
const xGuide = '┬';

function scatterPlot(
  data,
  {
    yUnit = "",
    xUnit = "",
    token = "+",
    padding = 1,
    guides = false,
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
  const yLabelLength = maxY.toString().length + yUnit.length + (yUnit || guides ? 1 : 0);
  const yLabelFactor = height - yLabelCount >= 1 ? height - yLabelCount : 1;
  // Create a map to pull from while create graph to eliminate some cycles
  const dataMap = createPointMap(dataPoints);

  const graph = [];
  // Top padding
  for (let i = 0; i < padding; i++) {
    graph.push(
      (guides ? yGuide : "").padStart(
        (yLabels ? yLabelLength : 0) + (guides ? 1 : 0),
        " "
      )
    );
  }

  // Draw graph
  for (let y = maxY; y >= minY; y--) {
    const line = [];
    // Add Y Labels
    if (yLabels) {
      if ((y - minY) % yLabelFactor === 0) {
        if (yUnit) {
          line.push((y + " " + yUnit).padStart(yLabelLength, " "));
        } else {
          line.push(y.toString().padStart(yLabelLength, " "));
        }
      } else {
        line.push("".padStart(yLabelLength, " "));
      }
    }

    // Padding after labels
    if (guides) {
      line.push(yGuide + ''.padEnd(padding, " "));
    } else {
      line.push("".padStart(padding, " "));
    }

    // Draw data points
    for (let x = minX; x <= maxX; x++) {
      // TODO: handle duplicates?
      const hasPoint = dataMap[y] && dataMap[y].includes(x);
      line.push(hasPoint ? token : " ");
    }
    // Add line to graph
    graph.push(line.join(""));
  }

  // Bottom padding
  for (let i = 0; i < padding; i++) {
    graph.push(
      (guides ? yGuide : "").padStart(
        (yLabels ? yLabelLength : 0) + (guides ? 1 : 0),
        " "
      )
    );
  }

  if (guides) {
    console.log({ width, padding })
    const yPad = "".padStart(yLabels ? yLabelLength + 1 : 2, ' ');
    graph.push(yPad + ''.padEnd(width + 1 +  padding * 2, xGuide));
  }

  // Add X Labels

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
