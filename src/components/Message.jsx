import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Message.module.css";

function Message({ message, navigateUrl, btnName }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(navigateUrl);
  }

  return (
    <div className={styles.messageContainer}>
      <p className={styles.messageText}>{message}</p>
      <button className={styles.actionButton} onClick={handleClick}>
        {btnName}
      </button>
    </div>
  );
}

export default Message;
