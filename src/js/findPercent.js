const findObj = require('./findObj');

module.exports = (arr, value) => {
  const matchObj = findObj(arr, value);
  return Math.round((matchObj.length / arr.length) * 100);
};
