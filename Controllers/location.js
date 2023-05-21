import Location from "../Models/location.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dhwyohosi",
  api_key: "494698875236269",
  api_secret: "MQ3B9Sogc_df25D_29KqEzUN4sk",
});
export const createLocation = async (req, res) => {
  try {
    const { name} = req.body;
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
    if (req.files.images && req.files.images.length > 0) {
      mainImage = req.files.images[0].url;
    } else if (images.length > 0) {
      mainImage = images[0].url;
    }

    const location = new Location({
      name,
  
      images,
      mainImage
    });
    const savedLocation = await location.save();
    res.status(201).json({ place: savedLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const Locations = await Location.find();
    res.status(200).json(Locations);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const getLocationById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const location = await Location.findById(id);

    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const editLocation = async (req, res, next) => {
  const id = req.params.id;
  const updateData = {
    name: req.body.name,
  };

  try {
    const location = await Location.findByIdAndUpdate(
      id,
      updateData,

      { new: true }
    );

    if (!location) return res.status(404).send("location not found");
    res
      .status(200)
      .json({ message: "location updated successfully.", updateData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating location in the database");
  }
};
export const deleteLocation = async (req, res, next) => {
  const id = req.params.id;
  await Location.findById(id)
    .then((location) => location.deleteOne())
    .then((location) =>
      res
        .status(201)
        .json({ message: "location successfully deleted", location })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
