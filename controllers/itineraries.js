import { Itinerary } from "../models/itinerary.js";

function index(req, res) {
  console.log("itineraries");
  Itinerary.find({})
    .populate("owner")
    .then((itineraries) => {
      res.json(itineraries);
    })
    .catch((err) => {
      res.json(err);
    });
}

function show(req, res) {
  Itinerary.findById(req.params.id)
    .populate("owner")
    .then((itinerary) => {
      console.log(itinerary);
      res.render("itineraries/:id", {
        itinerary,
        title: "Itinerary",
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/itineraries");
    });
}

function create(req, res) {
  Itinerary.create(req.body)
    .then((itinerary) => {
      itinerary.populate("owner").then((populatedItinerary) => {
        res.status(201).json(populatedItinerary);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function update(req, res) {}

function deleteItinerary(req, res) {
  Itinerary.findByIdAndDelete(req.params.id)
    .then((itinerary) => res.json(itinerary))
    .catch((err) => res.json(err));
}

export { index, show, create, update, deleteItinerary as delete };
