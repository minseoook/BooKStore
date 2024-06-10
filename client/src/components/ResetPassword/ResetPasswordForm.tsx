import { useState } from "react";
import styled from "./resetpasswordform.module.css";
import { resetPassword } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      await resetPassword({ email, password });
      alert("비밀번호 변경 성공");
      navigate("/login");
    } catch (err) {
      alert("비밀번호 변경 실패");
    }
  };

  return (
    <div className={styled.container}>
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={styled.labelEmail}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          className={styled.inputEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className={styled.labelPassword}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={styled.inputPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styled.button}>
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
