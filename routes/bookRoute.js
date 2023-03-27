const router = require("express").Router();

const {
  addBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { auth, allowedTo } = require("../middlewares/authMiddleware");

router.route("/").post(auth, allowedTo("admin"), addBook).get(getBooks);

router
  .route("/:id")
  .get(getSingleBook)
  .put(auth, allowedTo("admin"), updateBook)
  .delete(auth, allowedTo("admin"), deleteBook);

module.exports = router;
