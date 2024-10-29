const express = require("express");
const Movie = require("../models/movie");
const Actor = require("../models/actor");
const Producer = require("../models/producer");

const router = express.Router();

//get all movies route
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("producerId")
      .populate("actorsId");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get specific movie details route
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("producerId")
      .populate("actorsId");
    if (!movie) {
      return res.status(404).json({ message: "Movie Not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//creating new movie route
router.post("/", async (req, res) => {
  const { name, yearOfRelease, plot, poster, producerId, actorsId } = req.body;

  if (!name || !yearOfRelease || !plot || !poster || !producerId || !actorsId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const movie = new Movie({
    name,
    yearOfRelease,
    plot,
    poster,
    producerId,
    actorsId,
  });

  try {
    const saved_movie = await movie.save();

    await Actor.updateMany(
      {
        _id: { $in: actorsId },
      },
      {
        $addToSet: {
          movies: saved_movie._id,
        },
      }
    );

    await Producer.findByIdAndUpdate(producerId, {
      $addToSet: {
        movies: saved_movie._id,
      },
    });

    res.status(201).json(saved_movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update a movie by id
router.put("/:id", async (req, res) => {
  const { name, yearOfRelease, plot, poster, producerId, actorsId } = req.body;

  if (!name || !yearOfRelease || !plot || !poster || !producerId || !actorsId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updated_movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated_movie) {
      return res.status(404).json({ message: "Movie Not found" });
    }

    res.json(updated_movie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(400).json({ message: error.message });
  }
});

//delete a movie by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted_movie = await Movie.findByIdAndDelete(req.params.id);

    if (!deleted_movie) {
      return res.status(404).json({ message: "Movie Not found" });
    }

    await Actor.updateMany(
      { _id: { $in: deleted_movie.actorsId } },
      { $pull: { movies: deleted_movie._id } }
    );

    await Producer.findByIdAndUpdate(deleted_movie.producerId, {
      $pull: { movies: deleted_movie._id },
    });

    res.json({ message: "Movie Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
