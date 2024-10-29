const mongoose = require("mongoose");

const producer_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type:String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Bio Not Available",
    },
    image: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=",
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Producer", producer_schema);
