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
});
const Activity = Mongoose.model("Activity", activitySchema);
export default Activity;
