import { useEffect, useRef, useState } from "react";
import styles from "./TodoForm.module.css";
import { useAppContext } from "../AppContext";

const TodoForm = ({ hideForm, editObj, showTodo, hideTodo }) => {
  const [title, setTitle] = useState(editObj?.title || "");
  const [body, setBody] = useState(editObj?.body || "");
  const { addTodo, editTodo, isLoading } = useAppContext();
  const ref = useRef();

  const handleAddItem = () => {
    if (!title || !body) return;

    if (!editObj) addTodo(title, body);
    else editTodo(title, body, editObj.id);

    showTodo();
    hideForm();
  };

  useEffect(() => {
    hideTodo();
    ref.current.focus();
  }, [hideTodo]);

  return (
    <div className={styles.formContainer}>
      <h2>Add Todo</h2>
      <div>
        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          ref={ref}
          className={styles.inputField}
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="body">
          Body:
        </label>
        <textarea
          className={styles.textareaField}
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button
        disabled={isLoading}
        className={styles.addButton}
        onClick={handleAddItem}
      >
        {editObj ? "Edit" : "Add"}
      </button>
    </div>
  );
};

export default TodoForm;
