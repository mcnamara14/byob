const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
  response.send('I\'m Working!');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all restaurants 

app.get('/api/v1/restaurants', (request, response) => {
  database('restaurants').select()
    .then((restaurants) => {
      response.status(200).json(restaurants)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
});

// Get all drinks

app.get('/api/v1/drinks', (request, response) => {
  database('drinks').select()
    .then((drinks) => {
      response.status(200).json(drinks)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
});

// Get info for a single restaurant



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`); 
});