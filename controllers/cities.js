import { City } from "../models/city.js";

function index(req, res) {
  console.log("SEARCH idx function CITY", req.query);
  const error = req.query.error;
  if (req.query.City) {
    console.log("HITTING IF CONDITION");
    City.findById(req.query.city.city)
      .populate("city")
      .then((city) => {
        if (city) {
          res.render("cities/:id", {
            city,
            title: "City",
            error,
          });
        } else {
          throw new Error('Check spelling or try new search')  
        }
      });
  } else {
    City.find({}).then((cities) => res.json(cities));
  } 
}

function show(req, res) {
  City.findById(req.params.id)
    .then((city) => res.json(city))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function create(req, res) {
  console.log("hello");
  City.create(req.body)
    .then((city) => res.json(city))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function update(req, res) {
  City.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((city) => res.json(city))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function edit(req, res) {
  City.findById(req.params.id, req.body)
    .then((city) => res.json(city))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function deleteCity(req, res) {
  City.findByIdAndDelete(req.params.id)
    .then((city) => res.json(city))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export { index, show, create, update, edit, deleteCity as delete };
