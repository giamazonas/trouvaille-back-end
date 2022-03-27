import mongoose from "mongoose";

const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    desc: { 
      type: String, 
      required: true 
    },
    city: { 
      type: String, 
      required: true, 
      lowercase: true 
    },
    owner: { 
      type: 
      Schema.Types.ObjectId, 
      ref: "Profile" 
    },
    places: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Place" 
    }],
    population: { 
      type: String, 
      required: true 
    },
    state: { 
      type: String, 
      required: true, 
      uppercase: true 
    },
    walkable: { 
      type: Boolean, 
      default: true 
    },
    zip: { type: [String] },
    photo: { type: [String] },
  },
  { timestamps: true, }
);

const City = mongoose.model("City", citySchema);

export { City };
