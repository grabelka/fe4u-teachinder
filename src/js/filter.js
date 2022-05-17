const _ = require('lodash');

module.exports = (arr, country, age, gender, photo, favorite) => {
  const newArr = arr.filter((obj) => {
    let addCountry = false;
    let addAge = false;
    let addGender = false;
    let addPhoto = false;
    let addFavorite = false;
    if (!country || obj.country === country) {
      addCountry = true;
    }
    if (!gender || obj.gender === gender) {
      addGender = true;
    }
    if (_.isUndefined(favorite) || _.isNull(favorite) || obj.favorite === favorite) {
      addFavorite = true;
    }
    if (!photo || obj.picture_large !== '../images/user.png') {
      addPhoto = true;
    }
    if (!age || (!_.isUndefined(obj.age) && obj.age.toString() > age.split('-')[0].toString() && obj.age.toString() < age.split('-')[1].toString())) {
      addAge = true;
    }
    if (addCountry && addAge && addFavorite && addPhoto && addGender) {
      return true;
    }
    return false;
  });
  return newArr;
};
