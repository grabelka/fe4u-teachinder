const testModules = require('./test-module');
// const data = require('./mockNormalize');
const validation = require('./validation');
const filter = require('./filter');
const findObj = require('./findObj');
const findPercent = require('./findPercent');
const sort = require('./sort');
require('../css/app.css');

const getUrl = 'https://randomuser.me/api/?results=50';
const postUrl = 'http://localhost:3000/teachers';

let data;
let sortedData;
let filterArray;
let currentFav = 0;
let isAsc = false;
let ageCondition = false;
let countryCondition = false;
let genderCondition = false;
let onlyFav = false;
let onlyPhoto = false;

function normalize(obj1) {
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
  return arr;
}

function showTop() {
  for (let i = 0; i < 10; i += 1) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const name = document.createElement('p');
    const lastname = document.createElement('p');
    const speciality = document.createElement('p');
    const country = document.createElement('p');
    img.classList.add('image-large');
    img.src = data[i].picture_large;
    name.classList.add('image-name');
    name.textContent = data[i].full_name.split(' ')[0];
    lastname.classList.add('image-lastname');
    if (data[i].full_name.split(' ')[1]) lastname.textContent = data[i].full_name.split(' ')[1];
    country.classList.add('image-country');
    country.textContent = data[i].country;
    speciality.classList.add('image-speciality');
    speciality.textContent = data[i].course;
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(lastname);
    div.appendChild(speciality);
    div.appendChild(country);
    div.classList.add('starred');
    const star = document.createElement('p');
    star.classList.add('star');
    star.textContent = '★';
    div.appendChild(star);
    document.getElementsByClassName('top-container')[0].appendChild(div);
    if (data[i].favorite) {
      document.getElementsByClassName('star')[i].style.visibility = 'visible';
    }
  }
}

function showTable() {
  for (let i = 0; i < 10; i += 1) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    td1.textContent = data[i].full_name;
    td2.textContent = data[i].course;
    td3.textContent = data[i].age;
    td4.textContent = data[i].gender;
    td5.textContent = data[i].country;
    td1.classList.add('left-col');
    td1.classList.add('table-name');
    td2.classList.add('table-course');
    td3.classList.add('table-age');
    td4.classList.add('table-gender');
    td5.classList.add('table-country');
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    document.getElementsByClassName('table-content')[0].appendChild(tr);
  }
}

function showFav() {
  const fav = data.filter((obj) => obj.favorite);
  const next = document.getElementById('next');
  for (let i = 0; i < 5; i += 1) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const name = document.createElement('p');
    const lastname = document.createElement('p');
    const speciality = document.createElement('p');
    const country = document.createElement('p');
    img.classList.add('image-large');
    img.src = fav[i].picture_large;
    name.classList.add('image-name');
    name.textContent = fav[i].full_name.split(' ')[0];
    lastname.classList.add('image-lastname');
    if (fav[i].full_name.split(' ')[1]) lastname.textContent = fav[i].full_name.split(' ')[1];
    country.classList.add('image-country');
    country.textContent = fav[i].country;
    speciality.classList.add('image-speciality');
    speciality.textContent = fav[i].course;
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(lastname);
    div.appendChild(speciality);
    div.appendChild(country);
    document.getElementsByClassName('fav-container')[0].insertBefore(div, next);
  }
}

function openInfoPopup(searchData) {
  const teachers = findObj(data, searchData.trim());
  const teacher = teachers[0];
  if (teacher.full_name) document.getElementsByClassName('info-text-name')[0].innerHTML = teacher.full_name;
  if (teacher.course) document.getElementsByClassName('info-text-speciality')[0].innerHTML = teacher.course;
  if (teacher.city) document.getElementsByClassName('info-text')[0].innerHTML = `${teacher.country}, ${teacher.city}`;
  if (teacher.age) document.getElementsByClassName('info-text')[1].innerHTML = `${teacher.age}, ${teacher.gender}`;
  if (teacher.email) document.getElementsByClassName('info-text-mail')[0].innerHTML = teacher.email;
  if (teacher.phone) document.getElementsByClassName('info-text')[2].innerHTML = teacher.phone;
  if (teacher.note) document.getElementsByClassName('info-textinfo')[0].innerHTML = teacher.note;
  if (teacher.picture_large) document.getElementById('popup-img').src = teacher.picture_large;
  if (teacher.favorite) document.getElementById('info-star').innerHTML = '★';
  if (!teacher.favorite) document.getElementById('info-star').innerHTML = '☆';
  document.getElementsByClassName('info-popup')[0].style.visibility = 'visible';
  document.getElementsByClassName('info-popup')[0].style.visibility = 'visible';
}

function closeSearch() {
  for (let i = 0; i < document.getElementsByClassName('search-list').length; i += 1) {
    document.getElementsByClassName('search-list')[i].style.visibility = 'hidden';
  }
}

function closeSearch() {
  for (let i = 0; i < document.getElementsByClassName('search-list').length; i += 1) {
    document.getElementsByClassName('search-list')[i].style.visibility = 'hidden';
  }
}

function search() {
  closeSearch();
  const searchData = document.getElementsByClassName('search-teacher')[0].value.trim();
  const teachers = findObj(data, searchData);
  const div = document.createElement('div');
  div.classList.add('search-list');
  for (let i = 0; i < teachers.length; i += 1) {
    const container = document.createElement('div');
    container.classList.add('search-container');
    const img = document.createElement('img');
    img.classList.add('image-small');
    img.src = teachers[i].picture_large;
    const name = document.createElement('p');
    name.textContent = teachers[i].full_name;
    container.appendChild(img);
    container.appendChild(name);
    div.appendChild(container);
  }
  if (!teachers.length) {
    const message = document.createElement('p');
    message.textContent = 'Teacher not found';
    div.appendChild(message);
  }
  document.getElementsByTagName('body')[0].appendChild(div);
}

function pagination(index) {
  fetch(`https://randomuser.me/api/?page=${index}&results=10&seed=abc`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.results;
    })
    .then((response) => {
      const responseData = normalize(response);
      for (let i = 0; i < 10; i += 1) {
        document.getElementsByClassName('table-name')[i].innerHTML = responseData[i].full_name;
        document.getElementsByClassName('table-course')[i].innerHTML = responseData[i].course;
        if (responseData[i].age) {
          document.getElementsByClassName('table-age')[i].innerHTML = responseData[i].age;
        } else {
          document.getElementsByClassName('table-age')[i].innerHTML = ' ';
        }
        document.getElementsByClassName('table-gender')[i].innerHTML = responseData[i].gender;
        document.getElementsByClassName('table-country')[i].innerHTML = responseData[i].country;
      }
    });
}

function changeTable(arr) {
  for (let i = 0; i < 10; i += 1) {
    if (arr[i]) {
      document.getElementsByClassName('table-name')[i].innerHTML = arr[i].full_name;
      document.getElementsByClassName('table-course')[i].innerHTML = arr[i].course;
      if (arr[i].age) {
        document.getElementsByClassName('table-age')[i].innerHTML = arr[i].age;
      } else {
        document.getElementsByClassName('table-age')[i].innerHTML = ' ';
      }
      document.getElementsByClassName('table-gender')[i].innerHTML = arr[i].gender;
      document.getElementsByClassName('table-country')[i].innerHTML = arr[i].country;
    } else {
      document.getElementsByClassName('table-name')[i].innerHTML = '';
      document.getElementsByClassName('table-course')[i].innerHTML = '';
      document.getElementsByClassName('table-age')[i].innerHTML = ' ';
      document.getElementsByClassName('table-gender')[i].innerHTML = '';
      document.getElementsByClassName('table-country')[i].innerHTML = '';
    }
  }
}

function sortTable(field) {
  isAsc = !isAsc;
  sortedData = sort(filterArray, field, isAsc);
  changeTable(sortedData);
}

function paginationFav(index) {
  const fav = data.filter((obj) => obj.favorite);
  currentFav += index;
  if (currentFav === -1) {
    currentFav = fav.length;
  }
  for (let i = 0; i < 5; i += 1) {
    document.getElementsByClassName('image-large')[i + 10].src = fav[(currentFav + i) % fav.length].picture_large;
    document.getElementsByClassName('image-name')[i + 10].innerHTML = fav[(currentFav + i) % fav.length].full_name.split(' ')[0];
    if (fav[(currentFav + i) % fav.length].full_name.split(' ')[1]) {
      document.getElementsByClassName('image-lastname')[i + 10].innerHTML = fav[(currentFav + i) % fav.length].full_name.split(' ')[1];
    } else {
      document.getElementsByClassName('image-lastname')[i + 10].innerHTML = ' ';
    }
    document.getElementsByClassName('image-speciality')[i + 10].innerHTML = fav[(currentFav + i) % fav.length].course;
    document.getElementsByClassName('image-country')[i + 10].innerHTML = fav[(currentFav + i) % fav.length].country;
  }
}

function changeFav(name) {
  const obj = findObj(data, name.trim())[0];
  if (obj.favorite) {
    data[data.indexOf(obj)].favorite = false;
    document.getElementById('info-star').innerHTML = '☆';
    document.getElementsByClassName('star')[data.indexOf(obj)].style.visibility = 'hidden';
  } else {
    data[data.indexOf(obj)].favorite = true;
    document.getElementById('info-star').innerHTML = '★';
    document.getElementsByClassName('star')[data.indexOf(obj)].style.visibility = 'visible';
  }
}

function showFilterTop() {
  filterArray = data;
  if (countryCondition) {
    filterArray = filter(filterArray, countryCondition, null, null, null, null);
  }
  if (ageCondition) {
    filterArray = filter(filterArray, null, ageCondition, null, null, null);
  }
  if (genderCondition) {
    filterArray = filter(filterArray, null, null, genderCondition, null, null);
  }
  if (onlyFav) {
    filterArray = filter(filterArray, null, null, null, null, true);
  }
  if (onlyPhoto) {
    filterArray = filter(filterArray, null, null, null, true, null);
  }
  for (let i = 0; i < 10; i += 1) {
    if (filterArray.length > i) {
      document.getElementsByClassName('starred')[i].style.visibility = 'visible';
      document.getElementsByClassName('image-large')[i].src = filterArray[i].picture_large;
      document.getElementsByClassName('image-name')[i].innerHTML = filterArray[i].full_name.split(' ')[0];
      if (filterArray[i].full_name.split(' ')[1]) {
        document.getElementsByClassName('image-lastname')[i].innerHTML = filterArray[i].full_name.split(' ')[1];
      } else {
        document.getElementsByClassName('image-lastname')[i].innerHTML = ' ';
      }
      document.getElementsByClassName('image-speciality')[i].innerHTML = filterArray[i].course;
      document.getElementsByClassName('image-country')[i].innerHTML = filterArray[i].country;
      if (filterArray[i].favorite) {
        document.getElementsByClassName('star')[i].style.visibility = 'visible';
      } else {
        document.getElementsByClassName('star')[i].style.visibility = 'hidden';
      }
    } else {
      document.getElementsByClassName('starred')[i].style.visibility = 'hidden';
      document.getElementsByClassName('star')[i].style.visibility = 'hidden';
    }
  }
  changeTable(filterArray);
}

function filterCountry(country) {
  if (country === 'all') {
    countryCondition = false;
  } else {
    countryCondition = country;
  }
  showFilterTop();
}

function filterAge(age) {
  if (age === 'all') {
    ageCondition = false;
  } else {
    ageCondition = age;
  }
  showFilterTop();
}

function filterGender(gender) {
  if (gender === 'male' || gender === 'female') {
    genderCondition = gender;
  } else {
    genderCondition = false;
  }
  showFilterTop();
}

function showOnlyFav() {
  if (!onlyFav) {
    onlyFav = true;
  } else {
    onlyFav = false;
  }
  showFilterTop();
}

function showOnlyPhoto() {
  if (!onlyPhoto) {
    onlyPhoto = true;
  } else {
    onlyPhoto = false;
  }
  showFilterTop();
}

function addTeacher() {
  const obj = {};
  obj.full_name = document.getElementById('addName').value;
  obj.email = document.getElementById('addMail').value;
  obj.phone = document.getElementById('addPhone').value;
  obj.course = document.getElementById('addCourse').value;
  obj.country = document.getElementById('addCountry').value;
  obj.city = document.getElementById('addCity').value;
  obj.b_date = document.getElementById('addDate').value;
  obj.age = 2022 - document.getElementById('addDate').value.split('-')[0];
  obj.color = document.getElementById('addColor').value;
  obj.note = document.getElementById('addNote').value;
  if (document.getElementById('addMale').checked) obj.gender = 'male';
  if (document.getElementById('addFemale').checked) obj.gender = 'female';
  obj.picture_large = '../images/user.png';
  document.getElementsByClassName('add-popup')[0].style.visibility = 'hidden';
  if (validation(obj)) {
    data.unshift(obj);
    showFilterTop();
    changeTable(data);
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  } else {
    alert('Your data is not valid.');
  }
}

console.log(testModules.hello);

fetch(getUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    return response.results;
  })
  .then((response) => {
    data = normalize(response);
    sortedData = data;
    filterArray = data;
    showTop();
    showTable();
    showFav();
    for (let i = 0; i < 15; i += 1) {
      document.getElementsByClassName('image-large')[i].addEventListener('click', () => openInfoPopup(`${document.getElementsByClassName('image-name')[i].textContent} ${document.getElementsByClassName('image-lastname')[i].textContent}`));
    }
  });

document.getElementById('search').addEventListener('click', search);

document.getElementById('sort-name').addEventListener('click', () => sortTable('full_name'));
document.getElementById('sort-course').addEventListener('click', () => sortTable('course'));
document.getElementById('sort-age').addEventListener('click', () => sortTable('age'));
document.getElementById('sort-gender').addEventListener('click', () => sortTable('gender'));
document.getElementById('sort-country').addEventListener('click', () => sortTable('country'));

document.getElementById('addTeacher').addEventListener('click', addTeacher);
document.getElementById('info-star').addEventListener('click', () => changeFav(document.getElementsByClassName('info-text-name')[0].textContent));

document.getElementById('filter-country').addEventListener('change', () => filterCountry(document.getElementById('filter-country').value));
document.getElementById('filter-age').addEventListener('change', () => filterAge(document.getElementById('filter-age').value));
document.getElementById('filter-gender').addEventListener('change', () => filterGender(document.getElementById('filter-gender').value));

document.getElementById('only-photo').addEventListener('click', showOnlyPhoto);
document.getElementById('only-fav').addEventListener('click', showOnlyFav);

document.getElementById('openAddPopup1').addEventListener('click', () => {
  document.getElementsByClassName('add-popup')[0].style.visibility = 'visible';
});
document.getElementById('openAddPopup2').addEventListener('click', () => {
  document.getElementsByClassName('add-popup')[0].style.visibility = 'visible';
});
document.getElementById('closeAddPopup').addEventListener('click', () => {
  document.getElementsByClassName('add-popup')[0].style.visibility = 'hidden';
});
document.getElementById('closeInfoPopup').addEventListener('click', () => {
  document.getElementsByClassName('info-popup')[0].style.visibility = 'hidden';
});

document.getElementById('page1').addEventListener('click', () => pagination(1));
document.getElementById('page2').addEventListener('click', () => pagination(2));
document.getElementById('page3').addEventListener('click', () => pagination(3));
document.getElementById('page-last').addEventListener('click', () => pagination(Math.floor(data.length / 10)));

document.getElementById('next').addEventListener('click', () => paginationFav(1));
document.getElementById('prev').addEventListener('click', () => paginationFav(-1));
document.getElementsByTagName('section')[0].addEventListener('click', closeSearch);
