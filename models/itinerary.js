import mongoose from 'mongoose'

const Schema = mongoose.Schema

const itinerarySchema = new Schema({
  name: { type: String, default: 'untitled' },
  time: { type: String, enum: ['12 a.m', '1 a.m',] },
  place: { type: Schema.Types.ObjectId, ref: 'Place' }, 
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  isPublic: { type: Boolean, required: true, default: false },

  coOwner: [{type: Schema.Types.ObjectId, ref: 'Profile'}]
}, {
  timestamps: true
})

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

export {
  Itinerary
}