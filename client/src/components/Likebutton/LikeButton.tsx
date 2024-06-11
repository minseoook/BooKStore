import { FaHeart } from "react-icons/fa";
import { BookDetail } from "../../models/book.model";
import styled from "./likebutton.module.css";

type Props = {
  book: BookDetail;
  onClick: (id: number) => void;
};
const LikeButton = ({ book, onClick }: Props) => {
  return (
    <div className={styled.container}>
      <FaHeart
        className={book.liked ? styled.active : styled.unactive}
        onClick={() => onClick(book.id)}
      />
      {book.likes}
    </div>
  );
};

export default LikeButton;
