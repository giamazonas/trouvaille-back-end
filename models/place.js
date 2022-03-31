import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    comment: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "Profile" },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const placeSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: "City", required: true },
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "Profile" },
    type: {
      type: String,
      enum: [
        "restaurant",
        "bar",
        "park",
        "coffee",
        "movie-theatre",
        "museum",
        "bowling",
        "arcade",
        "shop",
        "other",
      ],
    },

    url: { type: String },
    reviews: [reviewSchema],
    photo: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

export { Place };
