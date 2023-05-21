import Mongoose from "mongoose";
const locationSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
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
});
const Location = Mongoose.model("Location", locationSchema);
export default Location;
