const {Puzzle, Comment} = require('../models/puzzle')
const express = require('express');
const router = express.Router();
 
 ////////////////////////////////////////////////////////// POST new Puzzle //////////////////////////////////////////
 router.post('/newPuzzle', async (req, res) => {
    try {
        let puzzle = await Puzzle.findOne({ tTitle: req.body.tTitle });
        if (puzzle) return res.status(400).send('Puzzle title already exists.');
 
      puzzle = new Puzzle({
        creator: req.body.creator,
        tTitle: req.body.tTitle,
        description: req.body.description,
       });
 
      
       await puzzle.save();
       return res.send(puzzle);
 
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });  
////////////////////////////////////////////////////////// GET all Puzzles//////////////////////////////////////////
router.get('/', async (req, res) => {
   try {
      const puzzles = await Puzzle.find();
      return res.send(puzzles);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

////////////////////////////////////////////////////////// GET Puzzle By ID //////////////////////////////////////////
router.get('/:id', async (req, res) => {

   try {

      const puzzle = await Puzzle.findById(req.params.id);
      if (!puzzle)
         return res.status(400).send(`The puzzle with id "${req.params.id}" does not exist.`);
      return res.send(puzzle);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
////////////////////////////////////////////////////////// POST new comment //////////////////////////////////////////
router.post('/:puzzleId/comment', async (req, res) => {
   try {
      const { error } = (req.body); 
      if (error)
         return res.status(400).send(error);

      const puzzle = await Puzzle.findById(req.params.puzzleId)

      const comment = new Comment({

         author: req.body.author,
         feedback: req.body.feedback,

      });

      puzzle.comments.push(comment)

      await puzzle.save();
      return res.send(puzzle);

   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
}); 
 ////////////////////////////////////////////////////////// GET all Commets for a Puzzle//////////////////////////////////////////
 router.get('/:id/comments', async (req, res) => {
   
   try {

      const puzzle = await Puzzle.findById(req.params.id);
      if (!puzzle)
         return res.status(400).send(`The puzzle with id "${req.params.id}" does not exist.`);
      return res.send(puzzle.comments);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

  //////////////////////////////////////////////////////////////////// PUT  Likes to a Puzzle////////////////////////////////////////
router.put('/:puzzleId/likes', async (req, res) => {


   try {
      const puzzle = await Puzzle.findById(req.params.puzzleId)

      if (!puzzle)
         return res.status(400).send(`The puzzle with id "${req.params.puzzleId}" does not exist.`);
      puzzle.likes++;
     
      await puzzle.save();
      return res.send(puzzle);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
}); 
//////////////////////////////////////////////////////////////////// PUT  DisLikes to a Comment////////////////////////////////////////
router.put('/:puzzleId/dislikes', async (req, res) => {


   try {
      const puzzle = await Puzzle.findById(req.params.puzzleId)

      if (!puzzle)
         return res.status(400).send(`The puzzle with id "${req.params.puzzleId}" does not exist.`);
      puzzle.dislikes++;
     
      await puzzle.save();
      return res.send(puzzle);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
}); 

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;