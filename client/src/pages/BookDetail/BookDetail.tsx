import { useState } from "react";
import AddCartButton from "../../components/AddCartButton/AddCartButton";
import LikeButton from "../../components/Likebutton/LikeButton";
import { useBook } from "../../hooks/useBook";
import { formatDay } from "../../utils/day";
import { getImgSrc } from "../../utils/image";
import styled from "./bookdetail.module.css";
import { addReview, getReviewById } from "../../api/review.api";
import ReviewEmpty from "../../components/ReviewEmpty/ReviewEmpty";

const BookDetail = () => {
  const { book, toggleLike, reviews, setreviews } = useBook();
  const [comment, setComment] = useState("");
  if (!book) return null;

  const handleReviewSubmit = () => {
    addReview(book.id, comment).then(() => {
      alert("도서 후기 작성에 성공했습니다");
      setComment("");
      getReviewById(book.id).then((review) => {
        setreviews(review);
      });
    });
  };

  console.log(reviews);
  return (
    <>
      <div className={styled.container}>
        <div className={styled.left}>
          <img
            src={getImgSrc(book.img)}
            alt="bookimage"
            className={styled.bookImage}
          />
        </div>
        <div className={styled.right}>
          <p className={styled.pubDate}>{formatDay(book.pub_date)}</p>
          <h1 className={styled.title}>{book.title}</h1>
          <hr />
          <div className={styled.details}>
            <p className={styled.author}>
              <strong>작가:</strong> {book.author}
            </p>
            <p className={styled.category}>
              <strong>카테고리:</strong> {book.category_name}
            </p>

            <p className={styled.pages}>
              <strong>페이지 수:</strong> {book.pages}
            </p>
            <p className={styled.price}>
              <strong>가격:</strong> {book.price} 원
            </p>
          </div>
          <div className={styled.summary}>
            <h2>Summary</h2>
            <p>{book.summary}</p>
          </div>
          <div className={styled.detail}>
            <h2>Detail</h2>
            <p>{book.detail}</p>
          </div>

          <LikeButton book={book} onClick={toggleLike} />
          <AddCartButton book={book} />
        </div>
      </div>
      <div className={styled.formContainer}>
        <label htmlFor="comment">후기글 쓰기</label>
        <textarea
          id="comment"
          className={styled.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className={styled.submitBtn}
          onClick={handleReviewSubmit}
        >
          후기글 제출
        </button>
      </div>
      <div className={styled.reviewListContainer}>
        <h2>후기목록</h2>
        <ul className={styled.reviewList}>
          {reviews.length === 0 && <ReviewEmpty />}
          {reviews.map((review) => (
            <li className={styled.reviewItem} key={review.id}>
              <div className={styled.reviewInfo}>
                <p className={styled.reviewEmail}>{review.email}</p>
                <p className={styled.reviewDate}>{review.created_at}</p>
              </div>
              <p className={styled.reviewComment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookDetail;
