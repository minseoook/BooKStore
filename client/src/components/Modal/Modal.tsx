import { FaPlus } from "react-icons/fa";
import styled from "./modal.module.css";
import { useRef } from "react";
import useOutsideClick from "../../utils/useOutsideClick";

const Modal = ({
  img,
  setIsModalOpen,
}: {
  img: string;
  setIsModalOpen: (flag: boolean) => void;
}) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => setIsModalOpen(false));
  return (
    <div className={styled.container}>
      <div className={styled.overlay}>
        <div className={styled.modalBody} ref={ref}>
          <div className={styled.modalContents}>
            <img src={img} />
          </div>
          <button className={styled.modalClose}>
            <FaPlus onClick={() => setIsModalOpen(false)} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
