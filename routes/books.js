const express = require("express");
const { Book, validateBook, validateUpdateBook } = require("../models/books");
const router = express();
const auth = require("../middleware/auth");
const { verifyToken } = require("../middleware/verifyToken");

router.use(express.json());

router.get("/", auth, verifyToken, async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});
router.post("/", auth, verifyToken, async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({
    title: req.body.title,
    genre: req.body.genre,
    author: req.body.author,
    publicationYear: req.body.publicationYear,
  });
  await book.save();
  res.send(book);
});
router.get("/:id", auth, verifyToken, async (req, res) => {
  const result = await Book.findById(req.params.id);

  if (!result) {
    return res.status(404).send("The book with the given ID was not found.");
  }

  res.send(result);
});
router.put("/:id", auth, async (req, res) => {
  const { error } = validateUpdateBook(req);

  if (!error) return res.status(400).send(error.details[0].message);
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear,
      },
    },
    { new: true }
  );
  if (!book)
    return res.status(404).send("The book with the given ID was not found.");
  res.send(book);
});
router.delete("/:id", auth, async (req, res) => {
  const result = await Book.findByIdAndRemove(req.params.id);
  if (!result)
    return res.status(404).send("The Book with the given ID was not found.");
  res.send(result);
});

module.exports = router;
