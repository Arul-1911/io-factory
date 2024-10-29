const express = require("express");
const Actor = require("../models/actor");
const Movie = require("../models/movie");

const router = express.Router();

//create new actor
router.post("/", async (req, res) => {
  const { name, bio, dob, gender, image } = req.body;

  if (!name || !dob || !gender) {
    return res
      .status(400)
      .json({ message: "Name, dob, gender are required fields" });
  }

  try {
    const new_actor = new Actor({
      name,
      bio,
      dob,
      gender,
      image,
    });

    const save_actor = await new_actor.save();
    res.status(201).json(save_actor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all actors
router.get("/", async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get single actor and their movies
router.get("/:id", async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);

    if (!actor) return res.status(404).json({ message: "Actor Not Found" });

    const movies = await Movie.find({ actorsId: req.params.id }).populate(
      "producerId"
    );

    res.json({ ...actor.toObject(), movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
