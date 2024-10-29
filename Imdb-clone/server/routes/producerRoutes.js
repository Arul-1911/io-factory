const express = require("express");
const Producer = require("../models/producer");
const Movie = require("../models/movie");

const router = express.Router();

//create new producer
router.post("/", async (req, res) => {
  const { name, gender, dob, bio, image } = req.body;

  if (!name || !dob || !gender) {
    return res
      .status(400)
      .json({ message: "Name, gender, dob are required fields" });
  }

  try {
    const new_producer = new Producer({
      name,
      gender,
      dob,
      bio,
      image,
    });

    const save_producer = await new_producer.save();
    res.status(201).json(save_producer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all producers
router.get("/", async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get single producer and movie details
router.get("/:id", async (req, res) => {
  try {
    const producer = await Producer.findById(req.params.id);
    if (!producer)
      return res.status(404).json({ message: "Producer not found" });

    const movies = await Movie.find({ producerId: req.params.id }).populate(
      "actorsId"
    );
    res.json({ ...producer.toObject(), movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
