import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import styled from "./carts.module.css";
import { useNavigate } from "react-router-dom";
import { OrderSheet } from "../../models/order.model";

const Carts = () => {
  const { carts, deleteCart } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const totalNumber = selectedItems.length;
  const totalPrice = selectedItems.reduce((acc, item) => {
    const price = carts.find((cart) => cart.id === item)?.price;
    const quantity = carts.find((cart) => cart.id === item)?.quantity;
    return acc + price! * quantity!;
  }, 0);

  const handleOrder = () => {
    const orderBook: Omit<OrderSheet, "delivery"> = {
      items: selectedItems,
      firstBookTitle: carts[0].title,
      totalPrice: totalPrice,
      totalQuantity: selectedItems.reduce((acc, item) => {
        const quantity = carts.find((cart) => cart.id === item)?.quantity;
        return acc + quantity!;
      }, 0),
    };
    navigate("/order", { state: orderBook });
  };
  return (
    <div className={styled.wrapper}>
      <div className={styled.container}>
        {carts.map((cart) => (
          <div
            key={cart.id}
            className={styled.cartContainer}
            onClick={() => handleCheckboxChange(cart.id)}
          >
            <div className={styled.cartItem}>
              <input
                type="checkbox"
                checked={selectedItems.includes(cart.id)}
                onChange={() => handleCheckboxChange(cart.id)}
              />
              <div className={styled.cartDetails}>
                <h3>{cart.title}</h3>
                <p>{cart.summary}</p>
                <p>Price: {cart.price}원</p>
                <p>Quantity: {cart.quantity}</p>
              </div>
            </div>
            <button
              className={styled.cartDelete}
              onClick={() => deleteCart(cart.id)}
            >
              장바구니 삭제
            </button>
          </div>
        ))}
      </div>
      <div className={styled.summary}>
        <h2>선택상품</h2>
        <p>선택 갯수 : {totalNumber}</p>
        <p>전체 가격 : {totalPrice.toLocaleString()}원</p>
        <button className={styled.order} onClick={handleOrder}>
          주문하기
        </button>
      </div>
    </div>
  );
};

export default Carts;
