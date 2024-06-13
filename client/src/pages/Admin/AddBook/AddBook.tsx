import { useState } from "react";
import styled from "./addBook.module.css";
import axios from "axios";
import { authhttpClient } from "../../../api/authhttp";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [storedImage, setstoredImage] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [form, setForm] = useState("");
  const [isbn, setIsbn] = useState("");
  const [summary, setSummary] = useState("");
  const [detail, setDetail] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [contents, setContents] = useState("");
  const [price, setPrice] = useState("");
  const [pub_date, setPubDate] = useState("");

  const handleImageUpload = async () => {
    const formData = new FormData();
    if (!image) return;
    formData.append("file", image);
    formData.append("upload_preset", "uqbebwrp"); // Cloudinary의 업로드 설정 이름

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/daszezjrc/image/upload",
      formData
    );

    setstoredImage(response.data.secure_url);
    return response.data.secure_url; // 업로드된 이미지의 URL 반환
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      // const imageUrl = await handleImageUpload(); // 이미지 업로드 후 URL 받아오기

      const bookData = {
        title,
        img: storedImage, // 업로드된 이미지 URL
        category_id,
        form,
        isbn,
        summary,
        detail,
        author,
        pages,
        contents,
        price,
        pub_date,
      };

      await authhttpClient.post("/books", bookData); // 서버에 데이터 전송

      // 폼 초기화
      setTitle("");
      setImage(null);
      setCategoryId("");
      setForm("");
      setIsbn("");
      setSummary("");
      setDetail("");
      setAuthor("");
      setPages("");
      setContents("");
      setPrice("");
      setPubDate("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "category_id":
        setCategoryId(value);
        break;
      case "form":
        setForm(value);
        break;
      case "isbn":
        setIsbn(value);
        break;
      case "summary":
        setSummary(value);
        break;
      case "detail":
        setDetail(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "pages":
        setPages(value);
        break;
      case "contents":
        setContents(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "pub_date":
        setPubDate(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styled.container}>
      <h2>도서 추가</h2>
      <form className={styled.form}>
        <div className={styled.formGroup}>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="img">이미지:</label>
          <input
            type="file"
            id="img"
            name="img"
            required
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;
              if (selectedFile) {
                setImage(selectedFile);
              }
            }}
          />
          <button className={styled.imgbtn} onClick={handleImageUpload}>
            이미지 업로드
          </button>
        </div>
        {storedImage && <img src={storedImage} alt="Uploaded" />}
        <div className={styled.formGroup}>
          <label htmlFor="category_id">카테고리 ID:</label>
          <input
            type="number"
            id="category_id"
            name="category_id"
            value={category_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="form">형태:</label>
          <input
            type="text"
            id="form"
            name="form"
            value={form}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="summary">요약:</label>
          <textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="detail">상세 정보:</label>
          <textarea
            id="detail"
            name="detail"
            value={detail}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="author">저자:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="pages">페이지 수:</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={pages}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="contents">목차:</label>
          <textarea
            id="contents"
            name="contents"
            value={contents}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="price">가격:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styled.formGroup}>
          <label htmlFor="pub_date">출판일:</label>
          <input
            type="date"
            id="pub_date"
            name="pub_date"
            value={pub_date}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={styled.submitButton}
          onClick={handleSubmit}
        >
          도서 추가
        </button>
      </form>
    </div>
  );
};

export default AddBook;
