import { FaHeart } from "react-icons/fa";
import { Book } from "../../models/book.model";
import { formatNumber } from "../../utils/format";

import styled from "./bookItem.module.css";
import { Link } from "react-router-dom";

type Props = {
  book: Book;
};
const BookItem = ({ book }: Props) => {
  return (
    <Link to={`/book/${book.id}`}>
      <div className={styled.container}>
        <div className={styled.img}>
          <img src={book.img} alt={book.title} />
        </div>
        <div className={styled.content}>
          <h2 className={styled.title}>{book.title}</h2>
          <p className={styled.summary}>{book.summary}</p>
          <p className={styled.author}>{book.author}</p>
          <p className={styled.price}>{formatNumber(book.price)}원</p>
          <div className={styled.likes}>
            <FaHeart />
            <span>{book.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
