const express = require('express');
const router = express.Router();
const { authUser, authAdmin } = require('../middleware/authMiddleware');
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  addMovieComment,
  getMovieComments
} = require('../controllers/movieController');
console.log("Checking handler:", addMovie); // If this prints 'undefined', your import name is wrong!

// Admin Protected Routes
router.post('/addMovie', authUser, authAdmin, addMovie);
router.patch('/updateMovie/:id', authUser, authAdmin, updateMovie);
router.delete('/deleteMovie/:id', authUser, authAdmin, deleteMovie);

// User Protected Routes (Requires Login Token)
router.post('/addComment/:id', authUser, addMovieComment);

// Public / General Token Routes
router.get('/getMovies', getAllMovies);
router.get('/getMovie/:id', getMovieById);
router.get('/getComments/:id', getMovieComments);

module.exports = router;
