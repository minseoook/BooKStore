import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { useAuthStore } from "../store/authStore";
import { authfetchBook, fetchBook } from "../api/books.api";
import { useParams } from "react-router-dom";

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

  return { book };
};
