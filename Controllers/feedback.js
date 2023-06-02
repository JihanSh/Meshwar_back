import Feedback from "../Models/feedback.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dhwyohosi",
  api_key: "494698875236269",
  api_secret: "MQ3B9Sogc_df25D_29KqEzUN4sk",
});

class Controller {
  //get all the feedbacks
  async getAll(req, res) {
    try {
      const feedbacks = await Feedback.find().populate("user_id", "username");
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
async  post(req, res) {
  try {
    const { description, stars, user_id, place } = req.body;

    let feedImages = [];

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const uploadedImage = await cloudinary.uploader.upload(req.files[i].path);
        feedImages.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
    }

    const feedback = new Feedback({
      description,
      stars,
      feedImages,
      user_id,
      place,
    });

    await feedback.populate("user_id", "username");
    await feedback.save();

    // Calculate the average feedback for the place
    const feedbacks = await Feedback.find({ place: place });
    const totalFeedbacks = feedbacks.length;
    let totalStars = 0;

    for (let i = 0; i < totalFeedbacks; i++) {
      totalStars += feedbacks[i].stars;
    }

    const averageStars = totalFeedbacks > 0 ? totalStars / totalFeedbacks : 0;

    res.status(201).json({ feedback, averageStars });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}



  // get feedback by id
  async get(req, res) {
    const { id } = req.params;
    try {
      const feedback = await Feedback.findById(id).populate(
        "user_id",
        "username"
      );

      if (!feedback) {
        res.status(404).json({ message: "feedback not found" });
      } else {
        res.status(200).json(feedback);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // update a feedback
  async put(req, res) {
    try {
      //   const feedback = await Feedback.findById(req.params.id);
      //   const { description, stars } = req.body;

      //   if (description) feedback.description = description;
      //   if (stars) feedback.stars = stars;

      //   const updatedFeedback = await feedback.save();
      //   res.json(updatedFeedback);
      //   console.log(updatedFeedback);

      console.log("id ", req.body);

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      console.log("uiuiu ", updatedFeedback);
      res.status(200).json({
        message: "Feedback updated successfully",
        feedback: updatedFeedback,
      });
    } catch (error) {
      // If an error occurs, return a 500 error with the error message
      res.status(500).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  }

  //delete a product by id
  async delete(req, res) {
    const { id } = req.params;

    try {
      const place = await Place.findOne({ _id: id });

      if (!place) {
        res.status(404).json({ message: "place not found" });
      } else {
        await place.deleteOne();
        res.status(200).json({ message: "place deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getPagination(req, res) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 8;

    // Count the total number of products
    const count = await Place.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / limit);

    const skip = (page - 1) * limit;
    const places = await Place.find()
      .sort({ date_added: -1 }) // Sort places by the createdAt field in descending order
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      results: places.length,
      page,
      totalPages, // Add totalPages to the response object
      data: places,
    });
  }

  async getPlacebyActivity(req, res) {
    console.log("hello");
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 8;

    const activityId = req.params.id;
    // Count the total number of products
    const count = await Place.countDocuments({ activity: activityId });

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / limit);

    const skip = (page - 1) * limit;
    console.log("activityId: ", activityId);
    try {
      const places = await Place.find({
        activity: activityId,
      })
        .sort({ date_added: -1 })
        .skip(skip)
        .limit(limit);
      console.log("place", Place);
      res.status(200).json({
        results: places.length,
        page,
        totalPages, // Add totalPages to the response object
        data: places,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}
const controller = new Controller();

export default controller;
