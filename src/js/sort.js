module.exports = (arr, field, isAsc) => {
  if (!field) {
    return arr;
  }
  if (field === 'fullName' && !isAsc) {
    arr.sort((a, b) => (a.full_name < b.full_name ? 1 : -1));
    return arr;
  }
  if (field === 'fullName' && isAsc) {
    arr.sort((a, b) => (a.full_name > b.full_name ? 1 : -1));
    return arr;
  }
  if (field === 'bDay' && !isAsc) {
    arr.sort((a, b) => new Date(b.b_date) - new Date(a.b_date));
    return arr;
  }
  if (field === 'bDay' && isAsc) {
    arr.sort((a, b) => new Date(a.b_date) - new Date(b.b_date));
    return arr;
  }
  if (field === 'age' && !isAsc) {
    arr.sort((a, b) => b.age - a.age);
    return arr;
  }
  if (field === 'age' && isAsc) {
    arr.sort((a, b) => a.age - b.age);
    return arr;
  }
  if (field === 'country' && isAsc) {
    arr.sort((a, b) => (a.country < b.country ? 1 : -1));
    return arr;
  }
  if (field === 'country' && isAsc) {
    arr.sort((a, b) => (a.country > b.country ? 1 : -1));
    return arr;
  }
  return arr;
};
