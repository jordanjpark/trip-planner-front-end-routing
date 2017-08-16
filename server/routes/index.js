/* eslint-disable camelcase */

var router = require("express").Router();
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;
var Itinerary = require('../models').Itinerary;

router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] })
  ])
    .then(([hotels, restaurants, activities]) => {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});

// Get associations
router.get('/itineraries/:itinerary_id', (req, res, next) => {
  Itinerary.findById(req.params.itinerary_id, { include: [{ all: true }] })
    .then((itinerary) => res.json({itinerary}))
    .catch(next);
});

// Build associations
router.post('/itineraries', (req, res, next) => {
  Itinerary
    .create({})
    .then((itinerary) => {
      req.body.addHotel(req.body.hotels)
      req.body.addRestaurant(req.body.restaurants)
      req.body.addActivity(req.body.activities)
    });
    // access req.body id's
    // have ids (h,a,r), get db  objects (query on those ids)
    // pass those obj as params to add h.a.r.
    // hint: promise.all()

    // Promise.all([
  //     Hotel.findAll({ include: [{ all: true }] }),
  //     Restaurant.findAll({ include: [{ all: true }] }),
  //     Activity.findAll({ include: [{ all: true }] })
  //   ])
  //     .spread(function(dbHotels, dbRestaurants, dbActivities) {

  //     }
  //     .catch(next);
  // });
});

module.exports = router;
