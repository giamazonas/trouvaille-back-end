import { Itinerary } from "../models/itinerary.js"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
}

function addItinerary(req, res) {
  Profile.findByIdAndUpdate(res.req.params.profileId, {
    $push: { itineraries: res.req.params.itineraryId },
  }).then(() => {
    console.log("ADD ITINERARY");
  })
}

function showItineraries(req, res) {
  Profile.findById(req.params.id)
  .then(profile => profile.populate('itineraries'))
  .then((data) => res.json(data))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)
  })
}
  // .then(data => {
  //   console.log(data)
    // data.itineraries.forEach((itinerary, i) => {
      // console.log(itinerary)
      // itinerary.timePlace.forEach(place => {
      //   console.log(place.places)
      //   console.log(place.time)
      // })
    // })
  // })

export { 
  index,
  addItinerary,
  showItineraries
}
