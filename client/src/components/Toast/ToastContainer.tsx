import { useToastStore } from "../../store/toastStore";
import Toast from "./Toast";
import styled from "./toastContainer.module.css";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className={styled.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
