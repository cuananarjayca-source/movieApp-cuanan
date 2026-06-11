const Movie = require('../models/Movie');

// @desc    Create a new movie
// @route   POST /movies/addMovie
// @access  Private (Admin Only)
exports.addMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre } = req.body;

    const movie = new Movie({
      title,
      director,
      year,
      description,
      genre,
      comments: [] // Starts with an empty subdocument array
    });

    const createdMovie = await movie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all movies
// @route   GET /movies/getMovies
// @access  Public / Private User
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.status(200).json({
      movies: movies
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single movie by ID
// @route   GET /movies/getMovie/:id
// @access  Public / Private User
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a movie
// @route   PATCH /movies/updateMovie/:id
// @access  Private (Admin Only)
exports.updateMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      movie.title = title || movie.title;
      movie.director = director || movie.director;
      movie.year = year || movie.year;
      movie.description = description || movie.description;
      movie.genre = genre || movie.genre;

      const updatedMovie = await movie.save();

      return res.status(200).json({
        message: 'Movie updated successfully',
        updatedMovie: updatedMovie
      });
    } else {
      return res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a movie
// @route   DELETE /movies/deleteMovie/:id
// @access  Private (Admin Only)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      await movie.deleteOne();
      return res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a comment/review to a movie subdocument array
// @route   POST /movies/addComment/:id
// @access  Private (Logged-in User)
exports.addMovieComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Push new comment object into the schema's subdocument array
    movie.comments.push({
      userId: req.user._id, // Gather user context string automatically from protect middleware
      comment
    });

    await movie.save();
    return res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get comments for a specific movie
// @route   GET /movies/getComments/:id
// @access  Public / Private User
exports.getMovieComments = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).select('comments');

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json({
      comments: movie.comments
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
