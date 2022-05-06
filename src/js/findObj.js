module.exports = (arr, value) => {
  const condition = (obj) => obj.full_name === value || obj.full_name.split(' ')[0] === value || obj.full_name.split(' ')[1] === value || obj.note === value || (obj.age && obj.age.toString() === value);
  return arr.filter((obj) => condition(obj));
};
