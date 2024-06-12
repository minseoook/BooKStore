//mysql 모듈 소환
const mysql = require("mysql2");

//db와 연결 통로 생성
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3307,
  database: "bookshop",
  dateStrings: true,
});

module.exports = conn;
