const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const WordSchema = new Schema(
  {
    term: {
      type: String,
      required: true,
      unique: "Term cant be null",
    },
    description: {
      type: String,
      required: "Description cant be null",
    },
    synonyms: [{ type: Schema.Types.ObjectId, ref: "word" }],
    antonyms: [{ type: Schema.Types.ObjectId, ref: "word" }],
  },
  { timestamps: true }
);

const WordModel = mongoose.model("word", WordSchema);

module.exports = WordModel;