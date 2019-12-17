const {
  findArrayMax,
  parseInputData,
  determineBarPrecision
} = require("./utils");

function barGraph(
  data,
  {
    height,
    unit = "",
    width = 1,
    token = "■",
    padding = 1,
    yLabels = false,
    yLabelCount = 5,
    xLabelWidth = 5,
    lineEnding = "\n",

    columnWidth,
    columnSpacing
  } = {}
) {
  // Handle name aliases
  if (columnWidth) width = columnWidth;
  if (columnSpacing) padding = columnSpacing;
  // Parse input data
  const [dataPoints, xLabels] = parseInputData(data);
  const hasXLabels = xLabels.some(
    label => label !== undefined && label.length > 0
  );
  // Calculate required constants for measuring graph
  const max = findArrayMax(dataPoints);
  const precision = determineBarPrecision(max, height);
  const yLabelLength = max.toString().length + unit.length + (unit ? 1 : 0);
  // Graph array of lines
  const graph = [];

  // Create all graph lines from top to bottom
  for (let i = precision; i > 0; i--) {
    // For each data point determine what character to display
    const line = dataPoints.map(point => {
      const exists = point / max >= i / precision;
      const bar = exists ? "".padStart(width, token) : "".padStart(width, " ");
      // Pad the bar with the extra spacing to support x-axis labels
      return hasXLabels ? bar.padStart(xLabelWidth, " ") : bar;
    });

    if (yLabels) {
      // Determine if y-axis label should be displayed
      if (i % Math.floor(precision / yLabelCount) === 0) {
        // Calculate label number
        const label = ((i / precision) * max).toFixed(0);
        // Add unit to y-axis labels if provided
        if (unit) {
          line.unshift((label + " " + unit).padStart(yLabelLength, " "));
        } else {
          line.unshift(label.padStart(yLabelLength, " "));
        }
      } else {
        line.unshift("".padStart(yLabelLength, " "));
      }
    }

    graph.push(line.join("".padStart(padding, " ")));
  }

  if (hasXLabels) {
    graph.push(
      ...generateXLabels(xLabels, xLabelWidth, yLabels, yLabelLength, padding)
    );
  }

  return graph.join(lineEnding);
}

function generateXLabels(xLabels, xLabelWidth, yLabels, yLabelLength, padding) {
  const xLabelRows = [];
  // Continue pushing lines to the bottom of graph until all x-axis labels have been added
  while (!xLabels.every(label => label.length === 0)) {
    const line = xLabels.map((label, i) => {
      const top = label.slice(0, xLabelWidth);
      // Mutate the xLabels array for the while loop case
      xLabels[i] =
        xLabelWidth < label.length
          ? label.slice(xLabelWidth, label.length)
          : "";
      return top.padStart(xLabelWidth, " ");
    });

    // If y-axis labels are on add extra start spacing
    if (yLabels) {
      line.unshift("".padStart(yLabelLength, " "));
    }

    xLabelRows.push(line.join("".padStart(padding, " ")));
  }
  return xLabelRows;
}

module.exports = barGraph;
