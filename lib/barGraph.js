const { findArrayMax } = require("./utils");

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
    yLabelCount = 5
  } = {}
) {
  const graph = [];
  const max = findArrayMax(data);
  let precision = 50;

  if (height) {
    precision = height;
  } else {
    if (max < precision) {
      precision = max;
    }
  }

  for (let i = precision; i > 0; i--) {
    const line = data.map(point => {
      const exists = point / max >= i / precision;
      return exists
        ? "".padStart(columnWidth, token)
        : "".padStart(columnWidth, " ");
    });
    if (yLabels) {
      if (i % (precision / yLabelCount) === 0) {
        const label = (i / precision) * max;
        line.unshift(label.toFixed(0).padStart(max.toString().length, " "));
      } else {
        line.unshift("".padStart(max.toString().length, " "));
      }
    }
    graph.push(line.join("".padStart(columnSpacing, " ")));
  }
  return graph.join(lineEnding);
}

module.exports = barGraph;
