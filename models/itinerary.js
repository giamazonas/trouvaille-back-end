import  mongoose  from 'mongoose'

const Schema = mongoose.Schema

const itinerarySchema = new Schema({

})

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

export {
  Itinerary
}