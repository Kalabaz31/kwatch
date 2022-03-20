const asyncHandler = require("express-async-handler");

const Movie = require("../models/movieModel");

//  @desc Get all movies
//  @route GET /api/movies
//  @access public
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
});

//  @desc Set new movie
//  @route POST /api/movies
//  @access private
const setMovie = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a movie title");
  }

  const movie = await Movie.create(req.body);

  res.status(200).json(movie);
});

//  @desc update a specific movie
//  @route PUT /api/movies/:id
//  @access private
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(400);
    throw new Error("Movie Not Found!");
  }

  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedMovie);
});

//  @desc delete a specific movie
//  @route DELETE /api/movies/:id
//  @access private
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(400);
    throw new Error("Movie Not Found!");
  }

  await movie.remove()
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMovies,
  setMovie,
  updateMovie,
  deleteMovie,
};
