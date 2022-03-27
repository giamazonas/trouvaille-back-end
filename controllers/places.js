import { Place } from "../models/place.js";

function index(req, res) {
  // console.log('SEARCH idx function PLACE', req.query)
  // const error = req.query.error;
  // if(req.query.id) {
    // console.log('HITTING IF CONDITION')
  // }
  Place.find({})
    .then((places) => res.json(places))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function show(req, res) {
  Place.findById(req.params.id)
    .then((place) => res.json(place))
    .catch((err) => res.json(err));
}

function create(req, res) {
  console.log("========= req.body place controller: ========", req.body);

  Place.create(req.body)
    .then((place) => res.json(place))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function update(req, res) {
  Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((place) => {
      place.populate("place").then((populatePlace) => {
        res.status(201).json(populatePlace);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function deletePlace(req, res) {
  Place.findByIdAndDelete(req.params.id)
    .then((place) => res.json(place))
    .catch((err) => res.json(err));
}

function createReview(req, res) {
  console.log("CREATE REVIEW");
  City.findById(req.params.id, function (err, city) {
    city.comment.push(req.body);
    city.save(function (err) {
      res.redirect(`/city/${city._id}`);
    });
  });
}

export { index, show, create, update, createReview, deletePlace as delete };
