const restaurantData =  require('../data/restaurantData');

const createRestaurant = (knex, restaurant) => {
  return knex('restaurants').insert({
    name: restaurant.name,
    address: restaurant.address,
    zip: restaurant.zip, 
    city: restaurant.city,
    state: restaurant.state,
    phone: restaurant.phone,
    website: restaurant.website,
    monday: restaurant.monday,
    tuesday: restaurant.tuesday,
    wednesday: restaurant.wednesday,
    thursday: restaurant.thursday,
    friday: restaurant.friday,
    saturday: restaurant.saturday,
    sunday: restaurant.sunday
  }, 'id')
    .then(restaurantId => {
      let drinksPromises = [];

      restaurant.drinks.forEach(drink => {
        drinksPromises.push(
          createDrinks(knex, {
            description: drink.description,
            best_deal: drink.best_deal,
            restaurant_id: restaurantId[0]
          })
        );
      });

      return Promise.all(drinksPromises);
    });
};

const createDrinks = (knex, drink) => {
  return knex('drinks').insert(drink);
};

exports.seed = (knex, Promise) => {
  return knex('drinks').del()
    .then(() => knex('restaurants').del()) 
    .then(() => {
      let restaurantPromises = [];

      restaurantData.forEach(restaurant => {
        restaurantPromises.push(createRestaurant(knex, restaurant));
      });

      return Promise.all(restaurantPromises);
    })
    .catch(error => {
      return(`Error seeding data: ${error}`);
    });
};