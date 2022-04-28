module.exports = (arr, value) => {
  const condition = (obj) => obj.full_name === value || obj.note === value || (obj.age && obj.age.toString() === value);
  return arr.filter((obj) => condition(obj));
};
