import { useEffect, useState } from "react";
import { deleteCart as deleteCartApi, getCarts } from "../api/cart.api";
import { Cart } from "../models/cart.model";

export const useCart = () => {
  const [carts, setcarts] = useState<Cart[]>([]);

  useEffect(() => {
    getCarts().then((cart) => {
      setcarts(cart);
    });
  }, []);

  const deleteCart = (id: number) => {
    deleteCartApi(id).then(() => {
      setcarts(carts.filter((c) => c.id !== id));
    });
  };

  return { carts, deleteCart };
};
