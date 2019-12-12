const {
  findArrayMax,
  parseInputData,
  determineBarPrecision,
} = require('./utils');

function barGraph(
  data,
  {
    height,
    token = '■',
    lineEnding = '\n',
    columnWidth = 1,
    columnSpacing = 1,
    yLabels = false,
    yLabelCount = 5,
    unit = '',
    xLabelWidth = 5,
  } = {}
) {
  const [dataArr, xLabels] = parseInputData(data);
  const max = findArrayMax(dataArr);
  const precision = determineBarPrecision(max, height);
  const hasXLabels = xLabels.some(label => label && label.length > 0);
  const yLabelLength = max.toString().length + unit.length + (unit ? 1 : 0);

  const graph = [];
  // Iterate to build each "line" of the graph starting from the top
  for (let i = precision; i > 0; i--) {
    // Build the line from the data array number
    const line = dataArr.map(point => {
      // Determine if the bar would reach this height
      const exists = point / max >= i / precision;
      const bar = exists
        ? ''.padStart(columnWidth, token)
        : ''.padStart(columnWidth, ' ');
      // Pad the bar with the extra spacing to support x-axis labels
      return hasXLabels ? bar.padStart(xLabelWidth, ' ') : bar;
    });
    if (yLabels) {
      // Determine if y-axis label should be displayed
      if (i % Math.floor(precision / yLabelCount) === 0) {
        // Calculate label number
        const label = ((i / precision) * max).toFixed(0);
        // Add unit to y-axis labels if provided
        if (unit) {
          line.unshift((label + ' ' + unit).padStart(yLabelLength, ' '));
        } else {
          line.unshift(label.padStart(yLabelLength, ' '));
        }
      } else {
        line.unshift(''.padStart(yLabelLength, ' '));
      }
    }
    graph.push(line.join(''.padStart(columnSpacing, ' ')));
  }

  if (hasXLabels) {
    // Continue pushing lines to the bottom of graph until all x-axis labels have been added
    while (!xLabels.every(label => label.length === 0)) {
      const line = xLabels.map((label, i) => {
        const top = label.slice(0, xLabelWidth);
        // Mutate the xLabels array for the while loop case
        xLabels[i] =
          xLabelWidth < label.length
            ? label.slice(xLabelWidth, label.length)
            : '';
        return top.padStart(xLabelWidth, ' ');
      });
      // If y-axis labels are on add extra start spacing
      if (yLabels) {
        line.unshift(''.padStart(yLabelLength, ' '));
      }
      graph.push(line.join(''.padStart(columnSpacing, ' ')));
    }
  }

  return graph.join(lineEnding);
}

module.exports = barGraph;
