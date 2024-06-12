import React from "react";
import styled from "./addBook.module.css";

const AddBook = () => {
  return (
    <div className={styled.container}>
      <h2>도서 추가</h2>
      <form className={styled.form}>
        <div className={styled.formGroup}>
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="img">이미지:</label>
          <input type="number" id="img" name="img" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="category_id">카테고리 ID:</label>
          <input type="number" id="category_id" name="category_id" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="form">형태:</label>
          <input type="text" id="form" name="form" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="isbn">ISBN:</label>
          <input type="text" id="isbn" name="isbn" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="summary">요약:</label>
          <textarea id="summary" name="summary" required></textarea>
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="detail">상세 정보:</label>
          <textarea id="detail" name="detail" required></textarea>
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="author">저자:</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="pages">페이지 수:</label>
          <input type="number" id="pages" name="pages" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="contents">목차:</label>
          <textarea id="contents" name="contents" required></textarea>
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="price">가격:</label>
          <input type="number" id="price" name="price" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="pub_date">출판일:</label>
          <input type="date" id="pub_date" name="pub_date" required />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="likes">좋아요 수:</label>
          <input type="number" id="likes" name="likes" required />
        </div>
        <button type="submit" className={styled.submitButton}>
          도서 추가
        </button>
      </form>
    </div>
  );
};

export default AddBook;
