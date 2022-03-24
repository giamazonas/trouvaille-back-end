import { City } from "../models/city.js";

function index(req, res) {
  City.find({})
    .populate("owner")
    .then((cities) => {
      res.json(cities);
    })
    .catch((err) => {
      res.json(err);
    });
}

function show(req, res) {
  City.findById(req.params.id)
    .then((city) => res.json(city))
    .catch((err) => res.json(err));
}

function create(req, res) {
  City.create(req.body)
    .then((city) => {
      city.populate("city").then((populateCity) => {
        res.status(201).json(populateCity);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function update(req, res) {
  City.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(city => {
    city.populate("city") //is "city" correct in this field? check create also
    .then(populateCity => {
      res.status(201).json(populateCity)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function deleteCity(req, res) {
  City.findByIdAndDelete(req.params.id)
  .then(city => res.json(city))
  .catch(err => res.json(err))
}

export { index, show, create, update, deleteCity as delete };
