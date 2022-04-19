import { Place } from "../models/place.js"
import { v2 as cloudinary } from "cloudinary"
import fetch from 'node-fetch'

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN
const API_URL = 'https://api.mapbox.com/geocoding/v5/'

function index(req, res) {
  Place.find({})
    .populate("city")
    .then((places) => {
      res.json(places)
    })
    .catch((err) => {
      res.json(err)
    })
}

function show(req, res) {
  Place.findById(req.params.id)
    .then((place) => res.json(place))
    .catch((err) => {
      res.json(err)
    })
}

async function getCoordinates(cityInfo) {
  return fetch(cityInfo).then((res) => res.json())
}

function create(req, res) {
  let placeLatLong = `${API_URL}mapbox.places/${req.body.city.replaceAll(' ', '%20')}/${req.body.address.replaceAll(' ', '%20')}.json?&access_token=${MAPBOX_TOKEN}`

  getCoordinates(placeLatLong)
    .then(data => data.features)
    .then(data => data[0].center)
    .then(data => {
      req.body.lat = data[1]
      req.body.long = data[0]
      console.log(req.body)
    })

  req.body.owner = req.user.profile
  if (req.body.photo === "undefined" || !req.files["photo"]) {
    delete req.body["photo"]
    Place.create(req.body)
      .then((place) => res.json(place))
      .catch((err) => {
        res.status(500).json(err)
      })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader
      .upload(imageFile, { tags: `${req.body.name}` })
      .then((image) => {
        req.body.photo = image.url
        Place.create(req.body)
          .then((place) => {
            place.populate("owner").then((populatedPlace) => {
              res.status(201).json(populatedPlace)
            })
          })
          .catch((err) => {
            res.status(500).json(err)
          })
      })
  }
}

function update(req, res) {
  if (req.body.photo === "undefined" || !req.files["photo"]) {
    delete req.body["photo"]
    Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((place) => {
        place.populate("place").then((populatePlace) => {
          res.status(201).json(populatePlace)
        })
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader
      .upload(imageFile, { tags: `${req.body.name}` })
      .then((image) => {
        req.body.photo = image.url;
        Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((place) => {
            place.populate("owner").then((populatedPlace) => {
              res.status(201).json(populatedPlace)
            })
          })
          .catch((err) => {
            res.status(500).json(err)
          })
      })
  }
}

function deletePlace(req, res) {
  Place.findByIdAndDelete(req.params.id)
    .then((deletedPlace) => {
      res.json(deletedPlace)
    })
    .catch((err) => {
      res.json(err)
    });
}

function createReview(req, res) {
  const { comment, rating, _id } = req.body
  const form = {
    comment: comment,
    rating: parseInt(rating),
  }
  Place.findById(req.params.id).then((place) => {
    place.reviews.push(form)
    place.save()
    res.status(201).json(place)
  })
}

export { 
  index, 
  show, 
  create, 
  update, 
  createReview, 
  deletePlace as delete 
}
