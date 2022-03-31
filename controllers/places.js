import { Place } from "../models/place.js";
import { City } from "../models/city.js";
import { v2 as cloudinary } from "cloudinary";

function index(req, res) {
  Place.find({})
    .populate("city")
    .then((places) => {
      res.json(places);
    })
    .catch((err) => {
      res.json(err);
    });
}

function show(req, res) {
  Place.findById(req.params.id)
    .then((place) => res.json(place))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function create(req, res) {
  console.log("create places");
  req.body.owner = req.user.profile;
  if (req.body.photo === "undefined" || !req.files["photo"]) {
    delete req.body["photo"];
    Place.create(req.body)
      .then((place) => res.json(place))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    const imageFile = req.files.photo.path;
    cloudinary.uploader
      .upload(imageFile, { tags: `${req.body.name}` })
      .then((image) => {
        req.body.photo = image.url;
        Place.create(req.body)
          .then((place) => {
            place.populate("owner").then((populatedPlace) => {
              res.status(201).json(populatedPlace);
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      });
  }
}

function update(req, res) {
  if (req.body.photo === "undefined" || !req.files["photo"]) {
    delete req.body["photo"];
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
  } else {
    const imageFile = req.files.photo.path;
    cloudinary.uploader
      .upload(imageFile, { tags: `${req.body.name}` })
      .then((image) => {
        // console.log(image);
        req.body.photo = image.url;
        Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((place) => {
            place.populate("owner").then((populatedPlace) => {
              res.status(201).json(populatedPlace);
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      });
  }
}

function deletePlace(req, res) {
  Place.findByIdAndDelete(req.params.id)
    .then((place) => res.json(place))
    .catch((err) => res.json(err));
}

function createReview(req, res) {
  console.log('CREATE REVIEW IN CTRL', req.body)
  const { comment, rating, _id } = req.body;
  const form = {
    comment: comment,
    rating: parseInt(rating),
  };
  Place.findById(req.params.id).then((place) => {
    place.reviews.push(form);
    place.save();
    res.status(201).json(place);
    console.log('end of funciton')
  });
}

export { index, show, create, update, createReview, deletePlace as delete };
