export interface Book {
  id: number;
  title: string;
  img: number;
  category_id: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  pub_date: string;
  likes: number;
}

export interface BookDetail extends Book {
  category_name: string;
  liked: boolean;
}

export interface BookReviewItem {
  id: number;
  user_id: number;
  book_id: number;
  email: string;
  comment: string;
  created_at: string;
}

export type BookReviewItemWrite = Pick<BookReviewItem, "comment">;
