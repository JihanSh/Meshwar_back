import Location from "../Models/location.js";

export const createLocation = async (req, res) => {
  try {
    const newLocation = new Location({
      name: req.body.name,
    });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const Locations = await Location.find();
    res.status(200).json(Activities);
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
