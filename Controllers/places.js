import Activity from "../Models/activities.js";
import Place from "../Models/places.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dhwyohosi",
  api_key: "494698875236269",
  api_secret: "MQ3B9Sogc_df25D_29KqEzUN4sk",
});

class Controller {
  async post(req, res) {
    try {
      const { name, description, city, price, rating, activity, location } = req.body;
      console.log(activity);

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

      // const activity = await Activity.findOne(req.body.id);

      const place = new Place({
        name,
        images,
        mainImage,
        description,
        price,
        city,
        rating,
        activity,
        location,
      });
      const savedPlace = await place.save();
      res.status(201).json({ place: savedPlace });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  //get all the places
  async getAll(req, res) {
    try {
      const places = await Place.find()
        .populate("activity")
        .populate("location");
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async  getRandomPlace(req, res) {
  try {
    const count = await Place.countDocuments(); // Get the total count of places in the database
    const randomIndex = Math.floor(Math.random() * count); // Generate a random index within the range of the count
    const randomPlace = await Place.findOne()
      .populate("activity","name")
      .populate("location","name")
      .skip(randomIndex); // Skip to the random index
    res.status(200).json(randomPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  // get product by id
  async get(req, res) {
    const { id } = req.params;
    try {
      const place = await Place.findById(id).populate("activity", "location");

      if (!place) {
        res.status(404).json({ message: "place not found" });
      } else {
        res.status(200).json(place);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // update a product
  async put(req, res) {
    try {
      const { name, description, city, price, location } = req.body;

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
      const placeId = req.params.id;

      let place = null;
      if (!placeId) {
        // Create new place if ID is not provided
        place = new Place({
          name,
          images,
          mainImage,
          description,
          price,
          city,
          location,
        });
      } else {
        // Update existing place if ID is provided
        place = await Place.findById(placeId);

        if (!place) {
          return res.status(404).json({ message: "Place not found" });
        }

        place.name = name || place.name;
        place.mainImage = mainImage || place.mainImage;
        place.images = images.length > 0 ? images : place.images;
        place.description = description || place.description;
        place.price = price || place.price;
        place.city = city || place.city;
        place.location = location || place.location;
      }
      const savedPlace = await place.save();
      res.json({ product: savedPlace });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
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

  async getPlacebyActivityandLocation(req, res) {
    const activityId = req.params.activity;
    const locationId = req.params.location;

    try {
      const places = await Place.find({
        activity: activityId,
        location: locationId,
      }).populate();

      res.status(200).json(places);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getPlacebyActivity(req, res) {
    const activityId = req.params.activity;
    console.log(activityId);
    try {
      const places = await Place.find({
        activity: activityId,
      }).populate();
      res.status(200).json(places);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getPlacebyLocation(req, res) {
    const locationId = req.params.location;
    console.log(locationId);
    try {
      const places = await Place.find({
        location: locationId,
      }).populate("location");
      res.status(200).json(places);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
const controller = new Controller();

export default controller;
