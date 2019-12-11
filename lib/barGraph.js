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
    token = "■",
    lineEnding = "\n",
    columnWidth = 1,
    columnSpacing = 1,
    yLabels = false,
    yLabelCount = 5,
    xLabelWidth = 5
  } = {}
) {
  const graph = [];
  const [dataArr, xLabels] = parseInputData(data);
  const max = findArrayMax(dataArr);
  const precision = determineBarPrecision(max, height);
  const hasXLabels = xLabels.some(
    label => label !== undefined && label.length > 0
  );

  for (let i = precision; i > 0; i--) {
    const line = dataArr.map(point => {
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
