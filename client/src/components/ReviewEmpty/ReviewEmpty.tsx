import styled from "./reviewempty.module.css";

const ReviewEmpty = () => {
  return (
    <div>
      <div className={styled.container}>
        <h1>후기글이 없습니다</h1>
      </div>
    </div>
  );
};

export default ReviewEmpty;
