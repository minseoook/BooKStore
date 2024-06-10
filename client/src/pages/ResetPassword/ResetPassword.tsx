import { useState } from "react";
import styled from "./resetpassword.module.css";
import { resetPasswordRequest } from "../../api/auth.api";
import ResetPasswordForm from "../../components/ResetPassword/ResetPasswordForm";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetRequset, setResetRequset] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      await resetPasswordRequest({ email });
      setResetRequset(true);
    } catch (err) {
      console.log(err);
      alert("없는 이메일 입니다");
    }
  };
  if (resetRequset) {
    return <ResetPasswordForm />;
  }
  return (
    <div className={styled.container}>
      <h1>비밀번호 변경요청</h1>
      <p>비밀번호 요청전에 이메일 인증을 해주세요</p>
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

        <button type="submit" className={styled.button}>
          비밀번호 변경 요청
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
