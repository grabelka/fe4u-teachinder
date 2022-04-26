module.exports = (arr, country, age, gender, favorite) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    let addCountry = false;
    let addAge = false;
    let addGender = false;
    let addFavorite = false;
    if (!country || arr[i].country === country) {
      addCountry = true;
    }
    if (!gender || arr[i].gender === gender) {
      addGender = true;
    }
    if (favorite === undefined || favorite == null || arr[i].favorite === favorite) {
      addFavorite = true;
    }
    if (!age || (arr[i].age && arr[i].age.toString() === age.toString())) {
      addAge = true;
    }
    if (addCountry && addAge && addFavorite && addGender) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};
