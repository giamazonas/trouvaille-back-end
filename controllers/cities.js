import { City } from "../models/city.js"
import { v2 as cloudinary } from "cloudinary"

function index(req, res) {
  City.find({})
    .populate("owner")
    .then((cities) => {
      res.json(cities)
    })
    .catch((err) => {
      res.json(err)
    })
}

function show(req, res) {
  City.findById(req.params.id)
  .then((city) => {
    city.populate("places").then((populatedCity) => {
      console.log('::: POPULATEDCITY :::', (populatedCity))
      res.status(201).json(populatedCity)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
  }
)}

function create(req, res) {
  req.body.owner = req.user.profile
  if (req.body.photo === "undefined" || !req.files["photo"]) {
    delete req.body["photo"]
    City.create(req.body)
      .then((city) => {
        city.populate("owner").then((populatedCity) => {
          res.status(201).json(populatedCity)
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  } else {
    const imageFile = req.files.photo.path;
    cloudinary.uploader
      .upload(imageFile, { tags: `${req.body.name}` })
      .then((image) => {
        req.body.photo = image.url
        City.create(req.body)
          .then((city) => {
            city.populate("owner").then((populatedCity) => {
              res.status(201).json(populatedCity)
            })
          })
          .catch((err) => {
            console.log(err)
            res.status(500).json(err)
          })
      })
  }
}

function addPlace(req, res) {
  console.log('::::: res.params :::::', res.req.params)
  City.findByIdAndUpdate(res.req.params.cityId, {$push: {places: res.req.params.placeId}})
  .then(() => {
    console.log('ADD PLACE')
  })
}

function update(req, res) {
  console.log("update hit", req.body)
  if (req.body.photo === "undefined" || !req.files["photo"]) {
    delete req.body["photo"]
    City.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((city) => {
        console.log("first then", city)
        city.populate("owner").then((populatedCity) => {
          console.log("populte city", populatedCity)
          res.status(201).json(populatedCity)
        });
      })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    console.log("hit else clause")
    const imageFile = req.files.photo.path
    cloudinary.uploader
      .upload(imageFile, { tags: `${req.body.name}` })
      .then((image) => {
        console.log(image)
        req.body.photo = image.url
        City.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((city) => {
            console.log("city", city)
            city.populate("owner").then((populatedCity) => {
              console.log("pop city", populatedCity)
              res.status(201).json(populatedCity)
            })
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err)
          })
    })
  }
}

function edit(req, res) {
  console.log("EDIT function");
  City.findById(req.params.id, req.body)
    .then((city) => res.json(city))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
}

function deleteCity(req, res) {
  City.findByIdAndDelete(req.params.id)
    .then(deletedCity => {
      res.json(deletedCity)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
}

export { 
  index, 
  show, 
  create, 
  update, 
  addPlace,
  edit, 
  deleteCity as delete 
}
