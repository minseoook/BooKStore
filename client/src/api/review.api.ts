import { authhttpClient } from "./authhttp";
import { httpClient } from "./http";

export const addReview = async (bookId: number, comment: string) => {
  const response = await authhttpClient.post("/reviews", {
    book_id: bookId,
    comment,
  });
  return response.data;
};
export const getReviewById = async (bookId: number) => {
  const response = await httpClient.get(`/reviews/${bookId}`);
  return response.data;
};
