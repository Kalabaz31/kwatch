const mongoose = require("mongoose");
const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Add a Title For The Movie!"],
    },
    original_title: {
      type: String,
    },
    original_language: {
      type: String,
    },
    overview: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    release_date: {
      type: String,
    },
    runtime: {
      type: Number,
    },
    popularity: {
      type: Number,
    },
    tagline: {
      type: String,
    },
    status: {
      type: String,
    },
    vote_average: {
      type: Number,
    },
    vote_count: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema)