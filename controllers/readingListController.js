const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const ReadingList = require("../models/readingListModel");

exports.addBookToList = asyncHandler(async (req, res, next) => {
  console.log("here", req.user, req.params);
  await ReadingList.create({
    user_id: req.user.id,
    book_id: req.params.bookId,
  });
  res.status(201).send({ message: "Book Added successfully to your list" });
});

exports.removeBookFromList = asyncHandler(async (req, res, next) => {
  const book = await ReadingList.destroy({
    where: { book_id: req.params.bookId, user_id: req.user.id },
  });
  res.status(204).send();
});

exports.getMyList = asyncHandler(async (req, res, next) => {
  const myList = await User.findOne({
    where: { id: req.user.id },
    include: [{ model: Book, attributes: ['id', 'title', 'author'] }],
  });
  res.status(200).json(myList.books);
});
