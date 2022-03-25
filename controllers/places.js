import { Place } from '../models/place.js'

function index(req, res) {
  console.log('PLACES CONTROLLER INDEX')
  Place.find({})
  .then(places => res.json(places))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function show(req, res) {
  Place.findById(req.params.id)
  .then(place => res.json(place))
  .catch(err => res.json(err))
}

function create(req, res) {
  Place.create(req.body)
  .then(place => {
    place.populate('place') 
    .then(populatedPlace => {
      res.status(201).json(populatedPlace)
    })
  })
  console.log('place', Place.req.body)
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function update(req, res) {
  Place.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(place => {
    place.populate("place") 
    .then(populatePlace => {
      res.status(201).json(populatePlace)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function deletePlace(req, res) {
  Place.findByIdAndDelete(req.params.id)
  .then(place => res.json(place))
  .catch(err => res.json(err))
}

export {
  index,
  show,
  create,
  update,
  deletePlace as delete
}