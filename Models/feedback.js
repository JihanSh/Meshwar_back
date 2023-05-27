import mongoose from "mongoose";

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    description: {
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
    stars: {
      type: Number,
      required: true,
    },
    user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please include the user"],
      },
    ],
    place: [
      {
        type: Schema.Types.ObjectId,
        ref: "Place",
        required: [true, "Please include the Place"],
      },
    ],
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
