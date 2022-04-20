const randomUserMock = require('../mocks/lab3');
const additionalUsers = require('../mocks/additional');

const mockNormalize = (obj1, obj2) => {
  const arr = [];
  const course = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];
  const favorite = [true, false];
  const color = ['red', 'pink', 'green', 'blue', 'yellow', 'purple', 'white', 'gray', 'black', 'lightblue', 'orange', 'rose', 'aqua'];
  for (let i = 0; i < obj1.length; i += 1) {
    let id = '';
    for (let j = 0; j < 11; j += 1) {
      id += Math.floor(Math.random() * 10);
    }
    const obj = {
      id: `FN${id}`,
      course: course[Math.floor(Math.random() * course.length)],
      favorite: favorite[Math.floor(Math.random() * favorite.length)],
      color: color[Math.floor(Math.random() * color.length)],
      gender: obj1[i].gender,
      title: obj1[i].name.title,
      full_name: `${obj1[i].name.first} ${obj1[i].name.last}`,
      city: obj1[i].location.city,
      state: obj1[i].location.state,
      country: obj1[i].location.country,
      postcode: obj1[i].location.postcode,
      coordinates: obj1[i].location.coordinates,
      timezone: obj1[i].location.timezone,
      email: obj1[i].email,
      b_date: obj1[i].dob.date,
      age: obj1[i].dob.age,
      phone: obj1[i].phone,
      picture_large: obj1[i].picture.large,
      picture_thumbnail: obj1[i].picture.thumbnail,
      note: 'Good teacher',
    };
    arr.push(obj);
  }
  for (let i = 0; i < obj2.length; i += 1) {
    let add = true;
    for (let j = 0; j < arr.length; j += 1) {
      if (obj2[i].full_name === arr[j].full_name) add = false;
    }
    if (add) {
      arr.push(obj2[i]);
    }
  }
  return arr;
};

const validation = (obj) => {
  if (!obj.full_name && !obj.gender && !obj.note && !obj.state && !obj.city && !obj.countryl) {
    return false;
  }
  if (!obj.phone && !obj.age && !obj.email) {
    return false;
  }
  if (typeof obj.full_name !== 'string' && obj.full_name[0].toUpperCase() !== obj.full_name[0]) {
    return false;
  }
  if (obj.gender === 'male' && obj.gender === 'female') {
    return false;
  }
  if (typeof obj.note !== 'string' && obj.note[0].toUpperCase() !== obj.note[0]) {
    return false;
  }
  if (typeof obj.state !== 'string' && obj.state[0].toUpperCase() !== obj.state[0]) {
    return false;
  }
  if (typeof obj.city !== 'string' && obj.city[0].toUpperCase() !== obj.city[0]) {
    return false;
  }
  if (typeof obj.country !== 'string' && obj.country[0].toUpperCase() !== obj.country[0]) {
    return false;
  }
  if (obj.phone.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g) && Number.isInteger(obj.age) && obj.email.includes('@')) {
    return true;
  }
  return false;
};

const filter = (arr, country, age, gender, favorite) => {
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

const sort = (arr, fullName, age, bDay, country) => {
  if (fullName && fullName === '<-') {
    arr.sort((a, b) => (a.full_name < b.full_name ? 1 : -1));
  }
  if (fullName && fullName === '->') {
    arr.sort((a, b) => (a.full_name > b.full_name ? 1 : -1));
  }
  if (bDay && bDay === '<-') {
    arr.sort((a, b) => new Date(b.b_date) - new Date(a.b_date));
  }
  if (bDay && bDay === '->') {
    arr.sort((a, b) => new Date(a.b_date) - new Date(b.b_date));
  }
  if (age && age === '<-') {
    arr.sort((a, b) => b.age - a.age);
  }
  if (age === '->') {
    arr.sort((a, b) => a.age - b.age);
  }
  if (country && country === '<-') {
    arr.sort((a, b) => (a.country < b.country ? 1 : -1));
  }
  if (country && country === '->') {
    arr.sort((a, b) => (a.country > b.country ? 1 : -1));
  }
  return arr;
};

const findObj = (arr, value) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].full_name === value || arr[i].note === value) {
      return arr[i];
    }
    if (arr[i].age && arr[i].age.toString() === value.toString()) {
      return arr[i];
    }
  }
  return null;
};

const findPercent = (arr, compare, value) => {
  let matchObj = 0;
  if (compare === '>') {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].age && arr[i].age > value) {
        matchObj += 1;
      }
    }
  }
  if (compare === '<') {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].age && arr[i].age < value) {
        matchObj += 1;
      }
    }
  }
  return Math.round((matchObj / arr.length) * 100);
};

const data = mockNormalize(randomUserMock, additionalUsers);

validation(data[48]);

filter(data, 'Canada', null, null, null);

sort(data, '->', null, null, null);

findObj(data, 56);

findPercent(data, '<', 54);
