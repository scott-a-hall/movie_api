const express = require('express');
const app = express();

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let topMovies = [
  {
    title: 'Dumb & Dumber'
  },
  {
    title: 'The Dark Knight'
  },
  {
    title: 'We Were Soldiers'
  },
  {
    title: 'The Lion King'
  },
  {
    title: 'The Notebook'
  },
];

app.use(myLogger);

//GET requests
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
  res.send('My top 10 movies');
});

app.use('/documentation.html', express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong.');
});

app.listen(8080, () => {
  console.log('My app is listening on port 8080.');
});
