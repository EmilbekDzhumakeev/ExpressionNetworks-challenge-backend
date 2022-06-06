const mongoose = require('mongoose');
const Joi = require('joi'); 

////////////////////////////////////////////////////////////////////////////////////////////////
const commentSchema = new mongoose.Schema({
    author: { type: String, required: true, minlength: 5, maxlength: 50 },
    feedback: {type: String, required: true, minlength: 5, maxlength: 500},
    dateAdded: { type: Date, default: Date.now },
  });

////////////////////////////////////////////////////////////////////////////////////////////////
const puzzleSchema = new mongoose.Schema({
    creator:        { type: String, required: false, minlength: 5, maxlength: 50 },
    tTitle:         { type: String, required: true, minlength: 5, maxlength: 1000 },
    description:    { type: String, required: true, minlength: 5, maxlength: 1000},
    likes:          { type: Number, required: false, default: 0 },
    dislikes:       { type: Number, required: false, default: 0 },
    dateAdded:      { type: Date, default: Date.now },
    difficulty:     { type: String, required: false ,  enum: [ "Easy", "Medium", "Hard", "Genius" ] },
    comments: [commentSchema],
  });
////////////////////////////////////////////////////////////////////////////////////////////////

const Comment = mongoose.model("Comment", commentSchema);
const Puzzle = mongoose.model("Puzzle", puzzleSchema);

////////////////////////////////////////////////////////////////////////////////////////////////


 module.exports = {
  
   Comment: Comment,
   Puzzle: Puzzle,
  
   
 } 