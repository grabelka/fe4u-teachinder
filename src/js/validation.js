function checkString(str) {
  return typeof str !== 'string' && str[0].toUpperCase() !== str.full_name[0];
}

module.exports = (obj) => {
  if (!obj.full_name || !obj.gender || !obj.note || !obj.state || !obj.city || !obj.country) {
    return false;
  }
  if (!obj.phone || !obj.age || !obj.email) {
    return false;
  }
  if (checkString(obj.full_name)) {
    return false;
  }
  if (checkString(obj.note)) {
    return false;
  }
  if (checkString(obj.state)) {
    return false;
  }
  if (checkString(obj.city)) {
    return false;
  }
  if (checkString(obj.country)) {
    return false;
  }
  if (!obj.gender === 'male' && !obj.gender === 'female') {
    return false;
  }
  if (obj.phone.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g) && Number.isInteger(obj.age) && obj.email.includes('@')) {
    return true;
  }
  return false;
};
