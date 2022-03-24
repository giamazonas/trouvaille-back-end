import mongoose from 'mongoose'

const Schema = mongoose.Schema

const citySchema = new Schema({

})

const City = mongoose.model('City', citySchema)

export {
  City
}