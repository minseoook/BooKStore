import { useEffect, useState } from "react";
import { BookDetail, BookReviewItem } from "../models/book.model";
import { useAuthStore } from "../store/authStore";
import { authfetchBook, fetchBook } from "../api/books.api";
import { useParams } from "react-router-dom";
import { likeBook, unLikeBook } from "../api/like.api";
import { addCart } from "../api/cart.api";
import { getReviewById } from "../api/review.api";
import { useToast } from "./useToast";

export const useBook = () => {
  const { isloggedIn } = useAuthStore();
  const { id } = useParams();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [reviews, setreviews] = useState<BookReviewItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const { showToast } = useToast();
  useEffect(() => {
    if (isloggedIn) {
      authfetchBook(id!).then((book) => {
        setBook(book);
      });
    } else {
      fetchBook(id!).then((book) => {
        setBook(book);
      });
    }
    getReviewById(parseInt(id!)).then((review) => {
      setreviews(review);
    });
  }, [id, isloggedIn]);

  const toggleLike = async (id: number) => {
    if (!isloggedIn) {
      alert("로그인 후에 좋아요가 가능합나디");
      return;
    }
    if (!book) return;
    if (book?.liked) {
      unLikeBook(id).then(() => {
        setBook({ ...book, liked: false, likes: book.likes - 1 });
      });
      showToast("좋아요가 취소 되었습니다");
    } else {
      likeBook(id).then(() => {
        setBook({ ...book, liked: true, likes: book.likes + 1 });
      });
      showToast("좋아요가 성공 되었습니다");
    }
  };

  const addToCart = (id: number, quantity: number) => {
    if (!isloggedIn) {
      alert("로그인 후에 장바구니 담기가 가능합나디");
      return;
    }
    if (!book) return;
    addCart(id, quantity).then(() => {
      setIsCartModalOpen(true);
      setTimeout(() => {
        setIsCartModalOpen(false);
      }, 3000);
    });
  };

  return { book, toggleLike, addToCart, isCartModalOpen, reviews, setreviews };
};
