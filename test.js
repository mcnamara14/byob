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
    {description: '$5 select wells, cocktails, and wines', best_deal: false},
  ],
  foods: [
    {description: '$5.50 food options', best_deal: true},
    {description: '$6.50 late night burger (after 10pm)', best_deal: false},
  ]
},
{
  name: 'Brothers Bar & Grill',
  address: '1920 Market St',
  zip: 80211,
  city: 'Denver',
  state: 'CO',
  phone: '(303) 297-2767',
  website: 'http://www.brothersbar.com/denver-co/',
  monday: '8pm - close',
  tuesday: '8pm - close',
  wednesday: '8pm - close',
  thursday: '8pm - close',
  friday: '8pm - close',
  saturday: 'All day',
  sunday: 'All day',
  drinks: [
    {description: '$3 U-Call-Its', best_deal: true},
    {description: '$3 Red Headed Shots', best_deal: false}
  ],
  foods: [
    {description: '$2 Cheeseburger (Thurs 4pm - 10pm)', best_deal: true},
    {description: '25 cent wings (Weds 8pm - close)', best_deal: false}
  ]
}];