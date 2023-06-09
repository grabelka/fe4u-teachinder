const _ = require('lodash');

function checkString(str) {
  return typeof str === 'string' && _.upperFirst(str) === str;
}

module.exports = (obj) => {
  const requiredFields = ['full_name', 'gender', 'note', 'city', 'country', 'phone', 'age', 'email'];
  const strFields = ['full_name', 'note', 'city', 'country'];
  if (requiredFields.filter((el) => obj[el]).length !== requiredFields.length) {
    return false;
  }
  if (strFields.filter((el) => checkString(obj[el])).length !== strFields.length) {
    return false;
  }
  if (!obj.gender === 'male' && !obj.gender === 'female') {
    return false;
  }
  if (obj.phone.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g) && _.inRange(obj.age, 17, 100) && obj.email.includes('@')) {
    return true;
  }
  return false;
};
