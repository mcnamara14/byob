const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.set("port", process.env.PORT || 3000);
app.locals.title = "BYOB";

app.use(express.static(__dirname + "/../public"));
app.set("secretKey", "vonmiller");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Authentication

const checkAuth = (request, response, next) => {
  const token = request.body.token;
  const email = request.body.email;

  if (email) {
    const lastCharacters = email.substring(email.length - 10, email.length);
    if (lastCharacters !== "@turing.io") {
      response.status(403).send("You must be authorized to hit this endpoint.");
    }
  }

  if (token) {
    try {
      // let decoded = jwt.verify(token, app.get('secretKey'));
    } catch (err) {
      response.status(403).send("Invalid token");
    }
  } else {
    response.status(403).send("You must be authorized to hit this endpoint.");
  }

  next();
};

const checkAppName = (request, response, next) => {
  const appName = request.body.appName.toLowerCase();
  const application = app.locals.title.toLowerCase();

  if (!request.body.appName) {
    response.status(422).send("You must send an appName with the request");
  } else if (appName !== application) {
    response.status(403).send("Invalid application");
  }

  next();
};

app.post("/api/v1/authentication", (request, response) => {
  const {email, appName} = request.body;

  const token = jwt.sign({
    email,
    appName
  }, app.get("secretKey"), {expiresIn: "48h"});

  if (token) {
    response.status(201).json({token});
  } else {
    response.status(500).json({error});
  }
});

// Get all restaurants

app.get("/api/v1/restaurants", (request, response) => {
  const zipcode = request.query.zipcode;

  if (zipcode) {
    database("restaurants").where("zip", zipcode).select()
      .then((restaurants) => {
        response.status(200).send(restaurants);
      })
      .catch((error) => {
        response.status(500).json({error});
      });
  } else {
    database("restaurants").select()
      .then((restaurants) => {
        response.status(200).json(restaurants);
      })
      .catch((error) => {
        response.status(500).json({error});
      });
  }
});

// Get all drinks

app.get("/api/v1/drinks", (request, response) => {
  // select knex passes to callback
  database("drinks").select()
    .then((drinks) => {
      response.status(200).json(drinks);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

// Get info for a single restaurant

app.get("/api/v1/restaurants/:id", (request, response) => {
  database("restaurants").where("id", request.params.id).select()
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

app.get("/api/v1/restaurants/:restaurant_id/drinks", (request, response) => {
  database("drinks").where("restaurant_id", request.params.restaurant_id).select()
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

app.post("/api/v1/restaurants/:restaurant_id/drinks", checkAuth, checkAppName, (request, response) => {
  const {restaurant_id} = request.params;
  const {description, best_deal} = request.body;
  const drink = {description, best_deal, restaurant_id};

  for (let requiredParameter of ["description", "best_deal"]) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({error: "Expected description & best_deal to be passed into the body"});
    }
  }

  database("drinks").insert(drink, "id")
    .then(drink => {
      response.status(201).json({id: drink[0]});
    })
    .catch(error => {
      response.status(404).json({error: `No restaurants with an id of ${restaurant_id}.`});
    });
});

// Add a restaurant

app.post("/api/v1/restaurants/", checkAuth, checkAppName, (request, response) => {
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
    "name",
    "address",
    "zip",
    "city",
    "state",
    "phone",
    "website",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ]) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({error: "Body missing information for request"});
    }
  }

  database("restaurants").insert(restaurant, "id")
    .then(restaurant => {
      response.status(201).json({id: restaurant[0]});
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

// Delete a restaurant

app.delete("/api/v1/restaurants/:id", checkAuth, checkAppName, (request, response) => {
  database("drinks").where("restaurant_id", request.params.id).del()
    .then(() => {
      database("restaurants").where("id", request.params.id).del()
        .then(restaurant => {
          if (restaurant) {
            response.status(204).json({status: "Restaurant deleted"});
          } else {
            response.status(403).json({error: `Could not locate a restaurant with id ${request.params.id}`});
          }
        })
        .catch(error => {
          response.status(500).json({error});
        });
    });
});

// Delete a drink special from a restaurant

app.delete("/api/v1/drinks/:id/", checkAuth, checkAppName, (request, response) => {
  database("drinks").where("id", request.params.id)
    .del()
    .then(drink => {
      if (drink) {
        response.status(204).json({status: "Drink deleted"});
      } else {
        response.status(403).json({error: "Error drink not found!"});
      }
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

// Modify a restaurant

app.patch("/api/v1/restaurants/:id", checkAuth, checkAppName, (request, response) => {
  let updatedRestaurant = request.body;
  delete updatedRestaurant.token;
  delete updatedRestaurant.appName;

  database("restaurants").where("id", request.params.id)
    .update(updatedRestaurant)
    .then(restaurant => {
      if (restaurant) {
        response.status(201).json({status: `Restaurant ${request.params.id} was updated`});
      } else {
        response.status(403).json({error: "Restaurant found!"});
      }
    })
    .catch(error => {
      response.status(500).json({error: "Error editing restaurant"});
    });
});

app.patch("/api/v1/drinks/:id", checkAuth, checkAppName, (request, response) => {
  const updatedDrink = request.body;
  delete updatedDrink.token;
  delete updatedDrink.appName;

  database("drinks").where("id", request.params.id)
    .update(updatedDrink)
    .then(drink => {
      if (drink) {
        response.status(201).json({status: `Drink ${request.params.id} was updated`});
      } else {
        response.status(403).json({error: "Drink found!"});
      }
    })
    .catch(error => {
      response.status(500).json({error: "Error editing drink"});
    });
});

app.listen(app.get("port"), () => {
  // console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;