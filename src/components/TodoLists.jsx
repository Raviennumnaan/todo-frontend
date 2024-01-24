import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoLists.module.css";

function TodoLists({ todos, onEdit }) {
  return (
    <ul className={styles.listContainer}>
      {todos.map((todo) => (
        <li key={todo._id} className={styles.listItem}>
          <TodoItem
            title={todo.title}
            body={todo.body}
            onEdit={onEdit}
            id={todo._id}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoLists;
