import React from "react";
import styles from "./TodoItem.module.css";
import { useAppContext } from "../AppContext";

function TodoItem({ title, body, onEdit, id }) {
  const { deleteTodo, isLoading } = useAppContext();

  function handleDelete() {
    deleteTodo(id);
  }

  return (
    <div className={styles.listItem}>
      <div className={styles.title}>
        <strong>{title}</strong>
      </div>
      <div>{body}</div>
      <div className={styles.buttons}>
        <button
          className={styles.editButton}
          disabled={isLoading}
          onClick={() => onEdit(title, body, id)}
        >
          Edit
        </button>
        <button
          disabled={isLoading}
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
