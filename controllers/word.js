const WordModel = require("../models/word");

/**
 * Get all words
 * TODO: Add pagination feature
 */
 exports.getAll = async (req, res, next) => {
    try {
      let words = await WordModel.find({});
      res.send({
        count: words.length,
        words,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
 * Get word by
 * TODO: Add pagination feature
 */
exports.getWord = async (req, res, next) => {
    try {
      let term = req.params.term;
      let word = await WordModel.findOne({ term });
      if (!word) {
        return res.status(404).send({
          message: "word not found",
        });
      }
      res.send({ word });
    } catch (err) {
      next(err);
    }
  };
  
  exports.createWord = async (req, res, next) => {
    try {
      //TODO: Requiere validation
      let { term, description } = req.body;
      let newWord = await WordModel.create({ term, description });
      res.send({ newWord });
    } catch (err) {
      next(err);
    }
  };
  
  exports.updateWord = async (req, res, next) => {
    try {
      // TODO: Requiere validation
      // What word update?
      let termToUpdate = req.params.term;
      // New data
      let { term, description } = req.body;
      let word = await WordModel.findOne({ term: termToUpdate });
      if(!word) return res.status(400).send({
        message: "Word to update not found"
      })
  
      word.term = term;
      word.description = description;
      let updatedWord = await word.save();
      
      if (word == updatedWord) {
        return res.send({
          message: "word is updated",
          word: updatedWord,
        });
      }
      res.send({
        message: "cannot update de word",
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.deleteWord = async (req, res, next) => {
    try {
      let term = req.params.term;
      let { deletedCount } = await WordModel.deleteOne({ term });
      if (deletedCount == 1) {
        return res.send({
          message: "successfully deleted",
        });
      }
      return res.status(400).send({
        message: "cannot delete the word, maybe is delete before",
      });
    } catch (err) {
      next(err);
    }
  };