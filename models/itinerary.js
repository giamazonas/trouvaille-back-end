import mongoose from 'mongoose'

const Schema = mongoose.Schema

const itinerarySchema = new Schema({
  isPublic: { type: Boolean, required: true, default: false },
  owner: { type: Schema.Types.ObjectID, ref: 'Profile' },
  place: { type: Schema.Types.ObjectID, ref: 'Place' },
  time: { type: String, enum: ['12 a.m', '1 a.m',] },
  coOwner: [{type: Schema.Types.ObjectID, ref: 'Profile'}]
}, {
  timestamps: true
})

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

export {
  Itinerary
}