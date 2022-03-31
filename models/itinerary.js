import mongoose from "mongoose";

const Schema = mongoose.Schema

const timePlaceSchema = new Schema(
  {
    time: {
      type: String,
      // enum: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
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
