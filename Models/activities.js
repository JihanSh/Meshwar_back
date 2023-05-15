import Mongoose from "mongoose";
const activitySchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  location: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
});
const Activity = Mongoose.model("Activity", activitySchema);
export default Activity;
