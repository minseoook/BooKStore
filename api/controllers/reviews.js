const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth");

const addReview = (req, res) => {
  const { book_id, comment } = req.body;

  const token = verifyToken(req, res);
  if (token instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 다시 하세요" });
  }
  if (token instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "토큰 값이 이상합니다" });
  }
  const sql =
    "INSERT INTO reviews (user_id, book_id, comment) VALUES (?, ?, ?)";
  const values = [token.id, book_id, comment];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).json("서버 오류");
    }
    return res.status(StatusCodes.CREATED).json("리뷰 추가 성공");
  });
};
const getReviewsByBookId = (req, res) => {
  const { book_id } = req.params;
  const sql = `
    SELECT reviews.*, users.email
    FROM reviews
    JOIN users ON reviews.user_id = users.id
    WHERE reviews.book_id = ?
  `;
  const values = [book_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).json("서버 오류");
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
module.exports = { addReview, getReviewsByBookId };
