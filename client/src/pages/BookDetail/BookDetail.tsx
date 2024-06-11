import AddCartButton from "../../components/AddCartButton/AddCartButton";
import LikeButton from "../../components/Likebutton/LikeButton";
import { useBook } from "../../hooks/useBook";
import { formatDay } from "../../utils/day";
import { getImgSrc } from "../../utils/image";
import styled from "./bookdetail.module.css";

const BookDetail = () => {
  const { book, toggleLike } = useBook();
  if (!book) return null;

  return (
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
  );
};

export default BookDetail;
