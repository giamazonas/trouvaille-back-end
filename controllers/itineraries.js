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
  Itinerary.findById(req.params.id)
  .populate("owner")
  .then(itinerary => {
    console.log(itinerary)
    res.render('itineraries/show', {
      itinerary,
      title: "i"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/itineraries")
  })
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