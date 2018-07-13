# Build Your Own Backend
## About the API

Build Your Own Backend is an API that provides happy hour data for downtown Denver restaurants. Authorized users are able to POST, PATCH, and DELETE data using the custom endpoints.

## Installation

To get started, clone down [this repo](https://github.com/mcnamara14/byob) then ``` npm install ```

Start the server ``` node server.js ```

## Requesting a JSON Web Token

Visit the [Heroku app](https://byob-tm-cs.herokuapp.com) and enter your email and app name 'BYOB'. You will then receive a [JWT](https://jwt.io/introduction/) that can be used to access restricted endpoints. 

## Endpoints

### Get

#### Retrieve all restaurants

``` GET /api/v1/restaurants ```

Sample response:

``` Status: 200 OK ```

``` javascript 
  [
    {
      "id": 15,
      "name": "Euclid Hall Bar and Kitchen",
      "address": "1317 14th St",
      "zip": 80202,
      "city": "Denver",
      "state": "CO",
      "phone": "(303) 595-4255",
      "website": "http://www.euclidhall.com",
      "monday": "4pm - 7pm",
      "tuesday": "4pm - 7pm",
      "wednesday": "4pm - 7pm",
      "thursday": "4pm - 7pm",
      "friday": "4pm - 7pm",
      "saturday": null,
      "sunday": null,
      "created_at": "2018-07-11T22:22:53.552Z",
      "updated_at": "2018-07-11T22:22:53.552Z"
    },
    ...
  ]
  ```
  
#### Retrieve a specific restaurant

``` GET /api/v1/restaurants/:id ```

Sample response:

``` Status: 200 OK ```

``` javascript 
  [
     {
        "id": 1,
        "name": "Ale House",
        "address": "1600 Penn",
        "zip": 80211,
        "city": "Denver",
        "state": "CO",
        "phone": "(303) 433-9734",
        "website": "http://www.alehousedenver.com/",
        "monday": "3pm - 6pm",
        "tuesday": "3pm - 6pm",
        "wednesday": "3pm - 6pm",
        "thursday": "3pm - 6pm",
        "friday": "3pm - 6pm",
        "saturday": null,
        "sunday": null,
        "created_at": "2018-07-11T22:22:53.537Z",
        "updated_at": "2018-07-11T22:22:53.537Z"
    }
  ]
  ```
  
#### Retrieve all drinks

``` GET /api/v1/drinks/ ```

Sample response:

``` Status: 200 OK ```

``` javascript 
  [
    {
        "id": 1,
        "description": "$5 select wells, cocktails, and wines",
        "best_deal": false,
        "restaurant_id": 2,
        "created_at": "2018-07-11T22:22:53.555Z",
        "updated_at": "2018-07-11T22:22:53.555Z"
    },
    {
        "id": 2,
        "description": "$2 Well Drinks, Bud Light & Coors Light",
        "best_deal": false,
        "restaurant_id": 2,
        "created_at": "2018-07-11T22:22:53.556Z",
        "updated_at": "2018-07-11T22:22:53.556Z"
    }
  ]
  ```
  
#### Retrieve all drinks from a specific restaurant

``` GET /api/v1/restaurants/:restaurant_id/drinks/ ```

Sample response:

``` Status: 200 OK ```

``` javascript 
  [
    {
        "id": 2,
        "description": "$5 select wells, cocktails, and wines",
        "best_deal": false,
        "restaurant_id": 2,
        "created_at": "2018-07-11T22:22:53.555Z",
        "updated_at": "2018-07-11T22:22:53.555Z"
    },
    {
        "id": 3,
        "description": "$2 Well Drinks, Bud Light & Coors Light",
        "best_deal": false,
        "restaurant_id": 2,
        "created_at": "2018-07-11T22:22:53.556Z",
        "updated_at": "2018-07-11T22:22:53.556Z"
    }
  ]
```

### Post

#### Add a restaurant

``` POST /api/v1/restaurants ```

Body of request must contain in JSON format the following properties:
``` 
name [string],
address [string],
zip [integer],
city [string],
state [string],
phone [string],
website [string],
monday [string],
tuesday [string],
wednesday [string],
thursday [string],
friday [string],
saturday [string],
sunday [string],
token(JSON Web Token as mentioned above),
appName('BYOB')
```

Sample response:

``` Status: 201 OK ```

``` javascript 
  [
    {
      "id": 15,
      "name": "Euclid Hall Bar and Kitchen",
      "address": "1317 14th St",
      "zip": 80202,
      "city": "Denver",
      "state": "CO",
      "phone": "(303) 595-4255",
      "website": "http://www.euclidhall.com",
      "monday": "4pm - 7pm",
      "tuesday": "4pm - 7pm",
      "wednesday": "4pm - 7pm",
      "thursday": "4pm - 7pm",
      "friday": "4pm - 7pm",
      "saturday": null,
      "sunday": null,
      "created_at": "2018-07-11T22:22:53.552Z",
      "updated_at": "2018-07-11T22:22:53.552Z"
    },
    ...
  ]
  ```
  
