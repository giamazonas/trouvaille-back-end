import { Place } from "../models/place.js"
import { City } from "../models/city.js"
import { v2 as cloudinary } from "cloudinary"

function index(req, res) {
  Place.find({})
  .populate('city')
  .then(places => {
    res.json(places)
  })
  .catch(err => {
    res.json(err)
  })
}


function show(req, res) {
  Place.findById(req.params.id)
    .then((place) => res.json(place))
    .catch((err) => {
      console.log(err)
      res.json(err);
    })
}

// function show(req, res) {
//   City.findById(req.params.id)
//   .then((place) => {
//     place.populate("city")
//     .then((populatedPlace) => {
//       console.log("::: POPULATEDPLACE SHOW FUNCTION  :::", populatedPlace)
//       res.status(201).json(populatedPlace)
//     })
//     .catch((err) => {
//       console.log(err)
//       res.json(err)
//     })
//   })
// }

function create(req, res) {
  req.body.owner = req.user.profile;
  if (req.body.photo === "undefined" || !req.files["photo"]) {
    // console.log(':::req.body.city:::', req.body.city)
    delete req.body["photo"]
    Place.create(req.body)
    // .then((place) => {
      // TESTING ---------V

      // City.patch(req.body.city, {$push: {places: place._id}})
      // console.log(':::::::::::: city.findById(req.body.city) ::::::::::::',City.findByIdAndUpdate(req.body.city))
      // City.findByIdAndUpdate(req.body.city, {palces: place._id})
      // console.log("========= req.body.city place controller: ========", req.body.city)
      // console.log("+++++++++ place    place controller:+++++++++", place)

      // TESTING ---------^
    // })
    .then((place) => res.json(place))
    .catch((err) => {
      console.log(err)
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
            console.log(err)
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
          res.status(201).json(populatePlace);
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader
      .upload(imageFile, { tags: `${req.body.name}` })
      .then((image) => {
        console.log(image)
        req.body.photo = image.url
        Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((place) => {
            place.populate("owner").then((populatedPlace) => {
              res.status(201).json(populatedPlace)
            })
          })
          .catch((err) => {
            console.log(err)
            res.status(500).json(err)
          });
      });
  }
}

function deletePlace(req, res) {
  Place.findByIdAndDelete(req.params.id)
    .then((place) => res.json(place))
    .catch((err) => res.json(err))
}

function createReview(req, res) {
  console.log("CREATE REVIEW")
  City.findById(req.params.id, function (err, city) {
    city.comment.push(req.body)
    city.save(function (err) {
      res.redirect(`/city/${city._id}`)
    })
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
