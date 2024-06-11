import { useLocation } from "react-router-dom";
import styled from "./order.module.css";
import { useState } from "react";
import { Delivery, OrderSheet } from "../../models/order.model";
import { addOrder } from "../../api/order.api";

const Order = () => {
  const location = useLocation();
  const orderDataFromCart = location.state;
  const { items, totalPrice, totalQuantity, firstBookTitle } =
    orderDataFromCart;
  const [delivery, setDelivery] = useState<Delivery>({
    address: "",
    receiver: "",
    contact: 0,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    const orderBook: OrderSheet = {
      items,
      delivery,
      totalQuantity,
      totalPrice,
      firstBookTitle,
    };

    addOrder(orderBook).then(() => {
      alert("주문 성공했습니다");
    });
  };

  return (
    <div className={styled.container}>
      <div className={styled.left}>
        <h2>배송지 정보</h2>
        <label>주소</label>
        <div className={styled.address}>
          <input
            type="text"
            name="address"
            placeholder="배송지 입력"
            onChange={handleChange}
          />
        </div>

        <label>수령인</label>
        <input
          type="text"
          name="receiver"
          placeholder="수령인 입력"
          onChange={handleChange}
        />
        <label>연락처</label>
        <input
          type="text"
          name="contact"
          placeholder="연락처 입력"
          onChange={handleChange}
        />
        <div className={styled.orderBookDesc}>
          <h2>주문 상품</h2>
          <p>
            {firstBookTitle} 등 총 {totalQuantity}권
          </p>
        </div>
      </div>

      <div className={styled.right}>
        <h2>주문 정보</h2>
        <p>선택 갯수 : {totalQuantity}</p>
        <p>전체 가격 : {totalPrice.toLocaleString()}원</p>
        <button className={styled.order} onClick={handleOrder}>
          결제하기
        </button>
      </div>
    </div>
  );
};

export default Order;
