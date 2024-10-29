const mongoose = require("mongoose");

const movie_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    yearOfRelease: {
      type: Number,
      required: true,
      min: 1888,
      max: new Date().getFullYear(),
    },
    plot: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/view-3d-cinema-film-reel_23-2151069472.jpg?t=st=1729941725~exp=1729945325~hmac=82278f935565325f50a501656e53a2aaefd2e28cfac0fe0b76e338c2e46fcd34&w=740",
    },
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producer",
      required: true,
    },
    actorsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movie_schema);
