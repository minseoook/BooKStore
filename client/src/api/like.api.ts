import { authhttpClient } from "./authhttp";

export const likeBook = async (id: number) => {
  const response = await authhttpClient.post(`/likes/${id}`);
  return response.data;
};

export const unLikeBook = async (id: number) => {
  const response = await authhttpClient.delete(`/likes/${id}`);
  return response.data;
};
