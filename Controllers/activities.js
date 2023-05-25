import Activity from "../Models/activities.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dhwyohosi",
  api_key: "494698875236269",
  api_secret: "MQ3B9Sogc_df25D_29KqEzUN4sk",
});
export const createActivity = async (req, res) => {
  
  try {
    const {name,description} = req.body

      let images = [];
            if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          const uploadedImage = await cloudinary.uploader.upload(
            req.files[i].path
          );
          images.push({
            public_id: uploadedImage.public_id,
            url: uploadedImage.secure_url,
          });
        }
      }
      let mainImage;
      if (req.files && req.files.images && req.files.images.length > 0) {
        mainImage = req.files.images[0].url;
      } else if (images.length > 0) {
        mainImage = images[0].url;
      }
 const activity = new Activity({
        name,
        images,
        mainImage,
        description,
      });
      const savedActivity = await activity.save();
      res.status(201).json({ activity: savedActivity  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

export const getAllActivities = async (req, res) => {
  try {
    const Activities = await Activity.find().populate("place");
    res.status(200).json(Activities);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const getActivityById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const activity = await Activity.findById(id);

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const editActivity = async (req, res, next) => {
  const id = req.params.id;
  const updateData = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const activity = await Activity.findByIdAndUpdate(
      id,
      updateData,

      { new: true }
    );

    if (!activity) return res.status(404).send("Activity not found");
    res
      .status(200)
      .json({ message: "Activity updated successfully.", updateData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating activity in the database");
  }
};
export const deleteActivity = async (req, res, next) => {
  const id = req.params.id;
  await Activity.findById(id)
    .then((activity) => activity.deleteOne())
    .then((activity) =>
      res
        .status(201)
        .json({ message: "activity successfully deleted", activity })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
