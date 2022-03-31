import mongoose from "mongoose";

const Schema = mongoose.Schema

const timePlaceSchema = new Schema(
  {
    time: {
      type: String,
    },
    places: {
      type: Schema.Types.ObjectId,
      ref: "Place",
    }
  },
  {
    timestamps: true,
  }
)

const itinerarySchema = new Schema(
  {
    name: { type: String, default: "untitled" },
    timePlace: [timePlaceSchema],
    owner: { type: Schema.Types.ObjectId, ref: "Profile" },
    isPublic: { type: Boolean, required: true, default: false },
    coOwner: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  },
  {
    timestamps: true,
  }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export { Itinerary };
