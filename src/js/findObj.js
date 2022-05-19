const _ = require('lodash');

module.exports = (arr, value) => {
  const condition = (obj) => `${obj.full_name.split(' ')[0]} ${obj.full_name.split(' ')[1]}` === _.trim(value) || obj.full_name === _.trim(value) || obj.full_name.split(' ')[0] === _.trim(value) || obj.full_name.split(' ')[1] === _.trim(value) || obj.note === _.trim(value) || (!_.isUndefined(obj.age) && obj.age.toString() === _.trim(value));
  return arr.filter((obj) => condition(obj));
};
