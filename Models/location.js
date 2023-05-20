import Mongoose from "mongoose";
const locationSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Location = Mongoose.model("Location", locationSchema);
export default Location;
