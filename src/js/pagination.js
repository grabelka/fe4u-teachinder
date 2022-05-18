module.exports = (index) => fetch(`https://randomuser.me/api/?page=${index}&results=10&seed=abc`, {
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
  });
