import Mongoose from "mongoose";
const Schema = new Mongoose.Schema();
const locationSchema = new Schema({
  name: {
    type: String,
    required: true, 
  },

});
const Location = Mongoose.model("Location", locationSchema);
export default Location;
