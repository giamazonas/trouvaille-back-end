import { Itinerary } from "../models/itinerary.js"

function index(req, res) {

}

function show(req, res) {
  req.body.owner = req.user.profile
  console.log(req.body)
  Itinerary.find({})
}

async function create(req, res) {
  if(Object.keys(req.body[0].length === 0)) delete req.body[0]
  req.body.owner = req.user.profile

  const itinerary = await Itinerary.create({
    name: req.body['24'].name,
    owner: req.body.owner
  })
  
  const keys = Object.keys(req.body)
  Object.values(req.body).forEach((item, i) => {
    if(keys[i] !== '24' && keys[i] !== 'owner' ) {
      const time = keys[i]
      let obj = {}
      obj['time'] = time
      obj['places'] = item
      itinerary.timePlace.push(obj)
    }
  })
  itinerary.save()
  res.status(201).json(itinerary)
}

function update(req, res) {}

function deleteItinerary(req, res) {
  Itinerary.findByIdAndDelete(req.params.id)
    .then((itinerary) => res.json(itinerary))
    .catch((err) => res.json(err))
}

export { 
  index, 
  show, 
  create, 
  update, 
  deleteItinerary as delete 
}