import Activity from "../Models/activities.js";

export const createActivity = async (req, res) => {
  try {
    const newActivity = new Activity({
      name: req.body.name,
      description: req.body.description,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
