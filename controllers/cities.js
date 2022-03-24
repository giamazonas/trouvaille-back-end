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


export {
  index,
}