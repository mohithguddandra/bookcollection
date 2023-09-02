//const Joi = require("joi");
const Joi = require("@hapi/joi");

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    Trim: true,
    maxlength: 25,
    minlength: 5,
  },
  genre: { type: String, required: true, minlength: 2, maxlength: 25 },
  author: {
    type: String,
    required: true,
    Trim: true,
    maxlength: 25,
    minlength: 5,
  },
  publicationYear: {
    type: Number,
    required: true,
    min: 1800,
    max: 2023,
  },
});
const Book = new mongoose.model("Books", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(25).required(),
    genre: Joi.string().min(5).max(25).required(),
    author: Joi.string().min(5).max(25).required(),
    publicationYear: Joi.number().required(),
  });
  return schema.validate(book);
}
function validateUpdateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(25).optional(),
    genre: Joi.string().min(5).max(25).optional(),
    author: Joi.string().min(5).max(25).optional(),
    publicationYear: Joi.number().optional(),
  });
  return schema.validate(book);
}
exports.Book = Book;
exports.validateBook = validateBook;
exports.validateUpdateBook = validateUpdateBook;
