import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      res.status(500).json(err)
    })
}

function addItinerary(req, res) {
  Profile.findByIdAndUpdate(res.req.params.profileId, {
    $push: { itineraries: res.req.params.itineraryId },
  }).then(() => {
  })
}

function showItineraries(req, res) {
  Profile.findById(req.params.id)
  .then(profile => profile.populate('itineraries'))
  .then((data) => res.json(data))
  .catch((err) => {
    res.status(500).json(err)
  })
}

export { 
  index,
  addItinerary,
  showItineraries
}
