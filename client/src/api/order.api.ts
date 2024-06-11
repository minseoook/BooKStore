import { OrderSheet } from "../models/order.model";
import { authhttpClient } from "./authhttp";

export const addOrder = async (orderData: OrderSheet) => {
  const response = await authhttpClient.post("/orders", orderData);
  return response.data;
};
