const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const Book = require("../models/bookModel");

exports.addBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

exports.getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.findAll();
  res.status(200).json(books);
});

exports.getSingleBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    return next(
      new ApiError(`Can't find book with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(book);
});

exports.updateBook = asyncHandler(async (req, res, next) => {
  const [rowsUpdated, [updatedBook]] = await Book.update(req.body, {
    where: { id: req.params.id },
  });
  if (!updatedBook) {
    return next(
      new ApiError(`Can't find book with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(updatedBook);
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.destroy({ where: { id: req.params.id } });
  if (!book) {
    return next(new ApiError(`No book with this id: ${req.params.id}`, 404));
  }
  res.status(204).send();
});
