import { useEffect, useState } from "react";
import styled from "./admin.module.css";
import { getAllUsers } from "../../api/user.api";
import { User } from "../../models/user.model";
import { Order } from "../../models/order.model";
import { Book } from "../../models/book.model";
import { fetchBooks } from "../../api/books.api";
import { fetchOrders } from "../../api/order.api";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { isAdmin } = useAuthStore();
  const [data, setData] = useState<Book[] | User[] | Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      alert("관리자만 가능한 페이지 입니다");
    }
  }, []);

  useEffect(() => {
    fetchData(activeTab, currentPage);
  }, [activeTab, currentPage]);

  const fetchData = async (tab: string, currentPage: number) => {
    try {
      let response;
      switch (tab) {
        case "users":
          response = await getAllUsers({ currentPage: currentPage });
          setData(response.data);
          setTotalCount(response.totalCount);
          setTotalPages(Math.ceil(response.totalCount / 8));
          break;
        case "products":
          response = await fetchBooks({ currentPage: currentPage });
          console.log(response);
          setData(response.books);
          setTotalCount(response.pagination.totalCount);
          setTotalPages(Math.ceil(response.pagination.totalCount / 8));
          break;
        case "orders":
          response = await fetchOrders({ currentPage: currentPage });
          console.log(response);
          setData(response.data);
          setTotalCount(response.totalCount);
          setTotalPages(Math.ceil(response.totalCount / 8));
          break;
        default:
          return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // 탭이 변경될 때 페이지를 다시 설정합니다.
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styled.container}>
      <div className={styled.tabs}>
        <button
          className={activeTab === "users" ? styled.activeTab : ""}
          onClick={() => handleTabChange("users")}
        >
          유저
        </button>
        <button
          className={activeTab === "products" ? styled.activeTab : ""}
          onClick={() => handleTabChange("products")}
        >
          상품
        </button>
        <button
          className={activeTab === "orders" ? styled.activeTab : ""}
          onClick={() => handleTabChange("orders")}
        >
          주문
        </button>
      </div>
      <div className={styled.table}>
        <h2>
          총 {activeTab} 수: {totalCount}
        </h2>
        <table>
          <thead>
            <tr>
              {activeTab === "users" && (
                <>
                  <th>User ID</th>
                  <th>Email</th>
                </>
              )}
              {activeTab === "products" && (
                <>
                  <th>Product ID</th>
                  <th>Name</th>
                </>
              )}
              {activeTab === "orders" && (
                <>
                  <th>Order ID</th>
                  <th>수령인,대표 책제목, 가격</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item: User | Book | Order) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {(item as User).email ||
                    (item as Book).title ||
                    `${(item as Order).receiver} , ${
                      (item as Order).book_title
                    }, ${(item as Order).total_price}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styled.pagination}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage ? styled.activePage : ""}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
