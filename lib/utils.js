function findArrayMax(data) {
  let max = 0;
  data.forEach(point => {
    if (point > max) {
      max = point;
    }
  });
  return max;
}

module.exports = {
  findArrayMax
}