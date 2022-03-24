import { City } from '../models/city.js'

function index (req, res) {
  City.find({})
  .populate('owner')
  .then(cities => {
    res.json(cities)
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

function deleteCity(req, res) {

}


export {
  index,
  show,
  create,
  update,
  deleteCity as delete,
  
}