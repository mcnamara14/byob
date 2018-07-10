exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(() => knex('drinks').del())
    .then(() => knex('restaurants').del())
    .then(() => {
      return Promise.all([
        knex('restaurants').insert({  
              name: 'Ale House', 
              address: '2501 16th St, Denver, CO', 
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
              sunday: null 
          }, 'id')
          .then(restaurant => {
            return knex('drinks').insert([
              { description: '2-for-1 wells', 
                best_deal: true,
                restaurant_id: restaurant[0] 
              },
              { description: '1/2 off drafts', 
              best_deal: false,
              restaurant_id: restaurant[0] 
            }
            ], 'restaurant_id')
          })
          .then(restaurantId => {
            return knex('foods').insert([
              { description: '$3 sliders', 
                best_deal: true,
                restaurant_id: restaurantId[0]
              }
            ])
          })
      ])
    })
};