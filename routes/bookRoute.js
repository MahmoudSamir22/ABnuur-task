const router = require("express").Router();

const {
  addBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  resizeBookImage,
} = require("../controllers/bookController");

const { uploadSingleImage } = require("../middlewares/fileUploadMiddleware");

const { auth, allowedTo } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(
    auth,
    allowedTo("admin"),
    uploadSingleImage("image"),
    resizeBookImage,
    addBook
  )
  .get(getBooks);

router
  .route("/:id")
  .get(getSingleBook)
  .put(auth, allowedTo("admin"), updateBook)
  .delete(auth, allowedTo("admin"), deleteBook);

module.exports = router;
