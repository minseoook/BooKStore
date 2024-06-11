import { authhttpClient } from "./authhttp";

export const addCart = async (bookId: number, quantity: number) => {
  const response = await authhttpClient.post("/carts", {
    book_id: bookId,
    quantity,
  });
  return response.data;
};

export const getCarts = async () => {
  const response = await authhttpClient.get("/carts");
  return response.data;
};

export const deleteCart = async (id: number) => {
  const response = await authhttpClient.delete(`/carts/${id}`);
  return response.data;
};
