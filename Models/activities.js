import Mongoose from "mongoose";
const activitySchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  place: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
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
const Activity = Mongoose.model("Activity", activitySchema);
export default Activity;
