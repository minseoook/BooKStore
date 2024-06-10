import { useBook } from "../../hooks/useBook";
import styled from "./bookdetail.module.css";

const BookDetail = () => {
  const { book } = useBook();
  console.log(book);
  return <div className={styled.container}>BookDetail</div>;
};

export default BookDetail;
