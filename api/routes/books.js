const express = require("express");
const router = express.Router();
const { getAllBooks, getBookDetail, addBook } = require("../controllers/book");

router.get("/", getAllBooks);

router.get("/:id", getBookDetail);

// router.get("/", getBooksByCategory);
router.post("/", addBook);
module.exports = router;
