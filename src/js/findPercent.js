module.exports = (arr, value) => {
  const condition = (obj) => obj.age > Number(value.split('-')[0]) && obj.age < Number(value.split('-')[1]);
  const matchObj = arr.filter((obj) => condition(obj));
  return Math.round((matchObj.length / arr.length) * 100);
};
