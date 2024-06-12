const express = require("express");
const router = express.Router();
const { addReview, getReviewsByBookId } = require("../controllers/reviews");

router.post("/", addReview);

router.get("/:book_id", getReviewsByBookId);

module.exports = router;
