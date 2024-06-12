import { authhttpClient } from "./authhttp";

type Props = {
  currentPage: number;
};
export const getAllUsers = async (params: Props) => {
  const response = await authhttpClient.get("/users", { params: params });
  return response.data;
};
