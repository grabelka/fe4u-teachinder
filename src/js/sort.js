module.exports = (arr, field, isAsc) => {
  if (!field) {
    return arr;
  }
  if (field === 'full_name' || field === 'course' || field === 'country' || field === 'gender') {
    arr.sort((a, b) => isAsc ? (a[field] && b[field] && (a[field].toLowerCase() > b[field].toLowerCase()) ? 1 : -1) : (a[field] && b[field] && (a[field].toLowerCase() < b[field].toLowerCase()) ? 1 : -1));
    return arr;
  }
  if (field === 'bDay' && !isAsc) {
    arr.sort((a, b) => isAsc ? new Date(a.b_date) - new Date(b.b_date) : new Date(b.b_date) - new Date(a.b_date));
    return arr;
  }
  if (field === 'age' && !isAsc) {
    arr.sort((a, b) => isAsc ? a.age - b.age : b.age - a.age);
    return arr;
  }
  if (field === 'age' && isAsc) {
    arr.sort((a, b) => a.age - b.age);
    return arr;
  }
  return arr;
};
