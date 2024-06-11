import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { useAuthStore } from "../store/authStore";
import { authfetchBook, fetchBook } from "../api/books.api";
import { useParams } from "react-router-dom";
import { likeBook, unLikeBook } from "../api/like.api";

export const useBook = () => {
  const { isloggedIn } = useAuthStore();
  const { id } = useParams();
  const [book, setBook] = useState<BookDetail | null>(null);

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
    } else {
      likeBook(id).then(() => {
        setBook({ ...book, liked: true, likes: book.likes + 1 });
      });
    }
  };

  return { book, toggleLike };
};
