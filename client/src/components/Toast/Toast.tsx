import React, { useEffect, useState } from "react";
import { FaBan, FaInfoCircle, FaPlus } from "react-icons/fa";
import { ToastItem, useToastStore } from "../../store/toastStore";
import styles from "./toast.module.css";

export const TOAST_REMOVE_DELAY = 3000;

const Toast = ({ id, message, type }: ToastItem) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleRemoveToast = () => {
    setIsFadingOut(true);
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemoveToast();
    }, TOAST_REMOVE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${
        isFadingOut ? styles.fadeOut : styles.fadeIn
      } ${type === "error" ? styles.error : styles.success}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <p>
        {type === "info" && <FaInfoCircle />}
        {type === "error" && <FaBan />}
        {message}
      </p>
      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Toast;
