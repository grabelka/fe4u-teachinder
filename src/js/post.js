const postUrl = 'http://localhost:3000/teachers';

module.exports = (obj) => fetch(postUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj),
})
  .then((response) => {
    return response.json();
  });
