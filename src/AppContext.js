import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./constants";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signup(username, email, password) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.message?.code === 11000)
        return setError("Username / email already exists");

      if (data.data?._id) {
        setUser(data.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email, password) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/api/v1/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.message?.code === 11000)
        return setError("Username / email already exists");

      if (data.data?._id) {
        setUser(data.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodo(title, body) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/api/v1/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, email: user.email }),
      });
      const { data } = await res.json();

      setTodos((todos) => [data, ...todos]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function editTodo(title, body, id) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/api/v1/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, email: user.email }),
      });
      const { data } = await res.json();

      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id !== id) return todo;
          return data;
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTodo(id) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/api/v1/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (data.status === "success")
        setTodos((todos) => {
          const index = todos.findIndex((todo) => todo._id === id);
          if (index === -1) return [...todos];
          todos.splice(index, 1);
          return [...todos];
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;

    async function getTodos() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${API_URL}/api/v1/todo/${user._id}`);
        const { data } = await res.json();

        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getTodos();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        error,
        todos,
        addTodo,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
