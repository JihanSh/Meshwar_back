import Location from "../Models/location.js";

export const createLocation = async (req, res) => {
  try {
    const { name, activity } = req.body;
    console.log(activity);
    let activities = [];
    if (activity) {
      for (let i = 0; i < activity.length; i++) {
        console.log("we are in loop aaaaaa");
        activities.push(activity[i]);
      }
    }
    const location = new Location({
      name,
      activity: activities
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
