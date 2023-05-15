// authentication method
import Mongoose from "mongoose";
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },

  role: {
    type: String,
    default: "User",
    required: true,
  },
  
});
const User = Mongoose.model("User", UserSchema);
export default User;
