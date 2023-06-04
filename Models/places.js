// authentication method
import Mongoose from "mongoose";
const placeSchema = new Mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [
    {
      public_id: {
        type: String,
        //required: true,
      },
      url: {
        type: String,
        //required: true,
      },
    },
  ],
  mainImage: {
    type: String,
    default: "",
  },

  city: {
    type: String,
  },
  price: {
    type: Number || String,
  },
  rating: {
    type: Number,
  },
  activity: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  location: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
  feedback: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      // required: [true, "Please include the Feedback"],
    },
  ],
});
const Place = Mongoose.model("Place", placeSchema);
export default Place;
