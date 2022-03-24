import  mongoose  from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({

})

const placeSchema = new Schema({

  reviews: [reviewSchema]
})

const Place = mongoose.model('Place', placeSchema)

export {
  Place
}