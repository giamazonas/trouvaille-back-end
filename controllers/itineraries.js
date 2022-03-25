import { Itinerary } from '../models/itinerary.js'

function index(req, res) {
  console.log('itineraries')
  Itinerary.find({})
  .populate('owner')
  .then(itineraries => {
    res.json(itineraries)
  })
  .catch(err => {
    res.json(err)
  })
}

function show(req, res) {

}

function create(req, res) {

}

function update(req, res) {

}

function deleteItinerary(req, res) {

}

export {
  index,
  show,
  create,
  update,
  deleteItinerary as delete
}