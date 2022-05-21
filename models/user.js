const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Always encrypt the password before save
UserSchema.pre("save", async function (next) {
  const user = this;
  // Auto-generate Salt, and 10 salt rounds
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// Helper method to validate password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model("user", UserSchema);

//Middlewares

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
      
      if (word == updatedWord) {ø
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

module.exports = UserModel;