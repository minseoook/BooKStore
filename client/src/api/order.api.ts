import { OrderSheet } from "../models/order.model";
import { authhttpClient } from "./authhttp";

export const addOrder = async (orderData: OrderSheet) => {
  const response = await authhttpClient.post("/orders", orderData);
  return response.data;
};

type Props = {
  currentPage: number;
};
export const fetchOrders = async (params: Props) => {
  const response = await authhttpClient.get("/orders", { params: params });
  return response.data;
};
