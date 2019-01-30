const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  image: String,
  link: String,
  date: { type: Date, default: Date.now }
});

bookSchema.index({
  googleId: 1,
}, {
    unique: true,
  });
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
