import { useState } from "react";
import { BookDetail } from "../../models/book.model";
import styled from "./addcartbutton.module.css";
import { useBook } from "../../hooks/useBook";
import { Link } from "react-router-dom";

type Props = {
  book: BookDetail;
};
const AddCartButton = ({ book }: Props) => {
  const [quantity, setquantity] = useState(0);
  const { addToCart, isCartModalOpen } = useBook();
  const handleIncrease = () => setquantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 0) {
      setquantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    addToCart(book.id, quantity);
  };

  return (
    <div className={styled.container}>
      <div className={styled.quantityContainer}>
        <button onClick={handleDecrease} className={styled.button}>
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setquantity(Number(e.target.value))}
          className={styled.input}
        />
        <button onClick={handleIncrease} className={styled.button}>
          +
        </button>
      </div>
      <button onClick={handleAddToCart} className={styled.addButton}>
        장바구니 담기
      </button>
      {isCartModalOpen && (
        <div className={styled.modalOverlay}>
          <div className={styled.modalContent}>
            <h2>장바구니로 이동하시겠습니까?</h2>
            <Link to="/carts">장바구니로 가기</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCartButton;
