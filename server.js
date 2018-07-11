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

app.get('/api/v1/restaurants/:id', (request, response) => {
  database('restaurants').where('id', request.params.id).select()
    .then(restaurants => {
      if (restaurants.length) {
        response.status(200).json(restaurants);
      } else {
        response.status(404).json({ 
          error: `Could not find a restaurant with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(404).json({ error });
    });
});

// Get all drink specials for one restaurant

app.get('/api/v1/restaurants/:restaurant_id/drinks', (request, response) => {
  database('drinks').where('restaurant_id', request.params.restaurant_id).select()
    .then(drinks => {
      if (drinks.length) {
        response.status(200).json(drinks);
      } else {
        response.status(404).json({ 
          error: `Could not find any drinks special for a restaurant with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(404).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`); 
});