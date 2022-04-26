const testModules = require('./test-module');
const data = require('./mockNormalize.js');
const validation = require('./validation.js');
const filter = require('./filter.js');
const findObj = require('./findObj.js');
const findPercent = require('./findPercent.js');
require('../css/app.css');

function openAddPopup() {
  document.getElementsByClassName('add-popup')[0].style.visibility = 'visible';
}

function closeAddPopup() {
  document.getElementsByClassName('add-popup')[0].style.visibility = 'hidden';
}

function closeInfoPopup() {
  document.getElementsByClassName('info-popup')[0].style.visibility = 'hidden';
}

function addTeacher() {
  closeAddPopup();
}

function openInfoPopup() {
  document.getElementsByClassName('info-popup')[0].style.visibility = 'visible';
}

function search() {
  const searchData = document.getElementsByClassName('search-teacher')[0].value;
  const teacher = findObj(data, searchData);
  console.log(data);
  document.getElementsByClassName('info-text-name')[0].innerHTML = searchData;
  openInfoPopup();
}

console.log(testModules.hello);
