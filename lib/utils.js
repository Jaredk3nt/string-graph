function findArrayMax(data) {
  let max = 0;
  data.forEach(point => {
    if (point > max) {
      max = point;
    }
  });
  return max;
}

function isObject(item) {
  return item === Object(item);
}

function determineBarPrecision(max, height) {
  let precision = 50; // DEFAULT VALUE

  if (height) {
    precision = height;
  } else {
    if (max < precision) {
      precision = max;
    }
  }

  return precision;
}

function parseInputData(data) {
  const xLabels = [];
  const dataArr = [];

  data.forEach(item => {
    let itemData = 0;
    let itemLabel = '';
    if (isObject(item)) {
      if (item.data) itemData = item.data;
      if (item.label) itemLabel = item.label;
    } else {
      itemData = item;
    }
    xLabels.push(itemLabel);
    dataArr.push(itemData);
  });

  return [dataArr, xLabels];
}

module.exports = {
  isObject,
  findArrayMax,
  parseInputData,
  determineBarPrecision
};
