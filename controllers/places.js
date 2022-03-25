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

}

function create(req, res) {

}

function update(req, res) {

}

function deletePlace(req, res) {

}

export {
  index,
  show,
  create,
  update,
  deletePlace as delete
}