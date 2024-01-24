import { useState } from "react";
import { useAppContext } from "../AppContext";
import Message from "../components/Message";
import TodoForm from "../components/TodoForm";
import TodoLists from "../components/TodoLists";

function Home() {
  const { user, todos } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editObj, setEditObj] = useState(null);

  function showForm() {
    setIsFormOpen(true);
  }

  function hideForm() {
    setIsFormOpen(false);
  }

  function handleEdit(title, body, id) {
    setIsFormOpen(true);
    setEditObj({ title, body, id });
  }

  if (!user)
    return (
      <Message
        message="Please login/signup to use Todo List"
        navigateUrl="/login"
        btnName="Login"
      />
    );
  return (
    <div>
      <div>
        {isFormOpen && <TodoForm hideForm={hideForm} editObj={editObj} />}
        {!isFormOpen && <button onClick={showForm}>Add Todo</button>}
      </div>
      <TodoLists todos={todos} onEdit={handleEdit} />
      {todos.length === 0 && !isFormOpen && <p>Start by adding a Todo</p>}
    </div>
  );
}

export default Home;
