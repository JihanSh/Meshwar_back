import Mongoose from "mongoose";
const activitySchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

});
const Activity = Mongoose.model("Activity", activitySchema);
export default Activity;
