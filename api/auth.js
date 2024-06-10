const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      const decodedJwt = jwt.verify(token, process.env.ACCESSJWTKEY);
      return decodedJwt;
    } else {
      throw new ReferenceError("jwt must be provided");
    }
  } catch (err) {
    console.log(err.name, err.message);
    return err;
  }
};

module.exports = verifyToken;
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const { StatusCodes } = require("http-status-codes");
// dotenv.config();

// const verifyToken = (req, res, next) => {
//   try {
//     let token = req.headers.authorization;
//     if (token) {
//       const decodedJwt = jwt.verify(token, process.env.ACCESSJWTKEY);
//       req.user = decodedJwt; // 유저 정보를 요청 객체에 추가
//       next(); // 다음 미들웨어 또는 라우트 핸들러로 넘어감
//     } else {
//       throw new ReferenceError("jwt must be provided");
//     }
//   } catch (err) {
//     console.log(err.name, err.message);
//     if (err instanceof jwt.TokenExpiredError) {
//       return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인 다시 하세요" });
//     }
//     if (err instanceof jwt.JsonWebTokenError) {
//       return res.status(StatusCodes.UNAUTHORIZED).json({ message: "토큰 값이 이상합니다" });
//     }
//     return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
//   }
// };

// module.exports = verifyToken;
