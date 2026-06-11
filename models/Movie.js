const mongoose = require('mongoose');

// 1. Define the subdocument schema for comments first
const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment text string']
  }
}, { timestamps: true });

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a movie title'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Please add a director name']
  },
  year: {
    type: Number,
    required: [true, 'Please add the release year']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre']
  },
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
