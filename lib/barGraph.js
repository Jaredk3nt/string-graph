const {
  isObject,
  findArrayMax,
  parseInputData,
  determineBarPrecision
} = require("./utils");

/**
 * Create a string bar graph from an array of data
 * @param {array} data
 * @param {object} options
 *  - precision: max number of sections
 */
function barGraph(
  data,
  {
    height,
    width = 1,
    token = "■",
    padding = 1,
    yLabels = false,
    yLabelCount = 5,
    xLabelWidth = 5,
    lineEnding = "\n",

    columnWidth = 1,
    columnSpacing = 1
  } = {}
) {
  const [dataPoints, xLabels] = parseInputData(data);
  const hasXLabels = xLabels.some(
    label => label !== undefined && label.length > 0
  );

  const max = findArrayMax(dataPoints);
  const precision = determineBarPrecision(max, height);
  // Graph array of lines
  const graph = [];
  // Create all graph lines from top to bottom
  for (let i = precision; i > 0; i--) {
    const line = dataPoints.map(point => {
      const exists = point / max >= i / precision;
      const bar = exists
        ? "".padStart(columnWidth, token)
        : "".padStart(columnWidth, " ");
      return hasXLabels ? bar.padStart(xLabelWidth, " ") : bar;
    });

    if (yLabels) {
      if (i % Math.floor(precision / yLabelCount) === 0) {
        const label = (i / precision) * max;
        line.unshift(label.toFixed(0).padStart(max.toString().length, " "));
      } else {
        line.unshift("".padStart(max.toString().length, " "));
      }
    }

    graph.push(line.join("".padStart(columnSpacing, " ")));
  }

  if (hasXLabels) {
    while (!xLabels.every(label => label.length === 0)) {
      const line = [];
      if (yLabels) {
        line.push("".padStart(max.toString().length, " "));
      }
      xLabels.forEach((label, i) => {
        const top = label.slice(0, xLabelWidth);
        if (xLabelWidth < label.length) {
          const bottom = label.slice(xLabelWidth, label.length);
          xLabels[i] = bottom;
        } else {
          xLabels[i] = "";
        }

        line.push(top.padStart(xLabelWidth, " "));
      });
      graph.push(line.join("".padStart(columnSpacing, " ")));
    }
  }

  return graph.join(lineEnding);
}

module.exports = barGraph;
