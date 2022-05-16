const getUrl = 'https://randomuser.me/api/?results=50';

module.exports = fetch(getUrl, {
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
