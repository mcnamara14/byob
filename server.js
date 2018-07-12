const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.set('secretKey', 'vonmiller');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Authentication

app.post('/api/v1/authentication', (request, response) => {
  const { email, appName } = request.body;

  const token = jwt.sign({
      email,
      appName
  }, app.get('secretKey'), { expiresIn: '48h'})

  if (token) {
    response.status(201).json({ token })
  } else {
    response.status(500).json(error)
  }
})

// Get all restaurants 

app.get('/api/v1/restaurants', (request, response) => {
  database('restaurants').select()
    .then((restaurants) => {
      response.status(200).json(restaurants);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

// Get all drinks

app.get('/api/v1/drinks', (request, response) => {
  // select knex passes to callback
  database('drinks').select()
    .then((drinks) => {
      response.status(200).json(drinks);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
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
      response.status(404).json({error});
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
      response.status(404).json({error});
    });
});

// Add a drink special to a restaurant

app.post('/api/v1/restaurants/:restaurant_id/drinks', (request, response) => {
  const {restaurant_id} = request.params;
  const {description, best_deal} = request.body;
  const drink = {description, best_deal, restaurant_id};

  for (let requiredParameter of ['description', 'best_deal']) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({error: 'Expected description & best_deal to be passed into the body'});
    }
  }

  database('drinks').insert(drink, 'id')
    .then(drink => {
      response.status(201).json({id: drink[0]});
    })
    .catch(error => {
      response.status(500).json({error: `No restaurants with an id of ${restaurant_id}.`});
    });
});

// Add a restaurant

app.post('/api/v1/restaurants/', (request, response) => {
  const {
    name,
    address,
    zip,
    city,
    state,
    phone,
    website,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  } = request.body;

  const restaurant = {
    name,
    address,
    zip,
    city,
    state,
    phone,
    website,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  };

  for (let requiredParameter of [
    'name',
    'address',
    'zip',
    'city',
    'state',
    'phone',
    'website',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({error: 'Body missing information for request'});
    }
  }

  database('restaurants').insert(restaurant, 'id')
    .then(restaurant => {
      response.status(201).json({id: restaurant[0]});
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

// Delete a restaurant

app.delete('/api/v1/restaurants/:id', (request, response) => {
  database('restaurants').where('id', request.params.id).del()
    .then(restaurant => {
      if (restaurant) {
        response.status(204).json({status: "Restaurant deleted"});
      } else {
        response.status(404).json({error: `Could not locate a restaurant with id ${request.params.id}`});
      }
    })
    .catch(error => {
      response.status(500).json({error: "Error!"});
    });
});

// Delete a drink special from a restaurant

app.delete('/api/v1/drinks/:id/', (request, response) => {
  database('drinks').where("id", request.params.id)
    .del()
    .then(drink => {
      if(drink) {
        response.status(204).json({status: "Drink deleted"});
      } else {
        response.status(404).json({error: "Error drink not found!"});
      }
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

// Modify a restaurant

app.patch('/api/v1/restaurants/:id', (request, response) => {
  const newRestaurant = request.body;

  database('restaurants').where("id", request.params.id)
    .update(newRestaurant)
    .then(restaurant => {
      if(restaurant) {
        response.status(201).json({status: `Restaurant ${request.params.id} was updated`});
      } else {
        response.status(422).json({error: "Restaurant found!"});
      }
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.patch('/api/v1/drinks/:id', (request, response) => {
  const newDrink = request.body;

  database('drinks').where("id", request.params.id)
    .update(newDrink)
    .then(drink => {
      if(drink) {
        response.status(201).json({status: `Drink ${request.params.id} was updated`});
      } else {
        response.status(422).json({error: "Drink found!"});
      }
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;