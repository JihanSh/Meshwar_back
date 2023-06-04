import mongoose from "mongoose";

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    description: {
      type: String,
      // required: true,
    },
    feedImages: [
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
      // required: true,
    },
    user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: [true, "Please include the user"],
      },
    ],

  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
