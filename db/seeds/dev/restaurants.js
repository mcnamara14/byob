let restaurantData = [{
  name: 'Ale House',
  address: '2501 16th St',
  zip: 80211,
  city: 'Denver',
  state: 'CO',
  phone: '(303) 433-9734',
  website: 'http://www.alehousedenver.com/',
  monday: '3pm - 6pm',
  tuesday: '3pm - 6pm',
  wednesday: '3pm - 6pm',
  thursday: '3pm - 6pm',
  friday: '3pm - 6pm',
  saturday: null,
  sunday: null,
  drinks: [
      {description: '$3 select Breckenridge & Wynkoop beers', best_deal: true},
      {description: '$5 select wells, cocktails, and wines', best_deal: false}
  ],
  foods: [
      {description: '$5.50 food options', best_deal: true},
      {description: '$6.50 late night burger (after 10pm)', best_deal: false},
  ]
}];

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
      )
    });

    return Promise.all(drinksPromises);
  }, 'restaurant_id')
  .then(restaurantId => {
    console.log(restaurantId)
    let foodsPromises = [];

    restaurant.foods.forEach(food => {
      foodsPromises.push(
        createFoods(knex, {
          description: food.description,
          best_deal: food.best_deal,
          restaurant_id: restaurantId[0]
        })
      )
    });

    return Promise.all(foodsPromises);
  })
};

const createDrinks = (knex, drink) => {
  return knex('drinks').insert(drink);
};

const createFoods = (knex, food) => {
  return knex('foods').insert(food);
};

exports.seed = (knex, Promise) => {
  return knex('drinks').del()
    .then(() => knex('foods').del()) 
    .then(() => knex('restaurants').del()) 
    .then(() => {
      let restaurantPromises = [];

      restaurantData.forEach(restaurant => {
        restaurantPromises.push(createRestaurant(knex, restaurant));
      });

      return Promise.all(restaurantPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};