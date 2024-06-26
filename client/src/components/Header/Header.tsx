import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import styled from "./header.module.css";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../api/auth.api";

const Header = () => {
  const { isloggedIn, logoutAction, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      logoutAction();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styled.wrapper}>
      <div className={styled.container}>
        <Link to="/">
          <div className={styled.logo}>
            <img
              src="https://img.icons8.com/cute-clipart/64/book.png"
              alt="book"
            />
          </div>
        </Link>

        <div className={styled.search}>
          <SearchBar />
        </div>
        <div className={styled.buttons}>
          {!!isAdmin && (
            <button className={styled.admin} onClick={() => navigate("/admin")}>
              관리자 페이지
            </button>
          )}
          {!!isAdmin && (
            <button
              className={styled.admin}
              onClick={() => navigate("/admin/addbook")}
            >
              상품 등록하기
            </button>
          )}
          {isloggedIn ? (
            <button className={styled.login} onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className={styled.login}>로그인</button>
              </Link>
              <Link to="/register">
                <button className={styled.register}>회원가입</button>
              </Link>
            </>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;
