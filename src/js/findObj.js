module.exports = (arr, value) => {
  const condition = (obj) => obj.full_name === value || obj.note === value || obj.age === value;
  const result = arr.filter((obj) => condition(obj));
  return result;
};
