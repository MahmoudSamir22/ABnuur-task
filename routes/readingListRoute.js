const router = require("express").Router();

const {
  addBookToList,
  removeBookFromList,
  getMyList,
} = require("../controllers/readingListController");

const { auth } = require("../middlewares/authMiddleware");

router.get("/", auth, getMyList);

router.post("/:bookId", auth, addBookToList);

router.delete("/:bookId", auth, removeBookFromList);

module.exports = router;
