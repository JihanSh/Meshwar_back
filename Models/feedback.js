import mongoose from "mongoose";

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String,
    },
    rating: {
      type: Number,
    },
    user_id:[ {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please include the user"],
    }],
    place_id: [{
      type: Schema.Types.ObjectId,
      ref: "Place",
      required: [true, "Please include the Place"],
    }],
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
