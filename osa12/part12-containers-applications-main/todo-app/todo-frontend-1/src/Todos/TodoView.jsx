import { useEffect, useState } from "react";
import axios from "../util/apiClient";

import TodoList from "./List";
import Form from "./Form";

const TodoView = () => {
  //console.log("***BASE_URL=", import.meta.env.VITE_BACKEND_URL);
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    const { data } = await axios.get("/todos");
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const createTodo = async (todo) => {
    const { data } = await axios.post("/todos", todo);
    setTodos([...todos, data]);
  };

  const deleteTodo = async (todo) => {
    await axios.delete(`/todos/${todo._id}`);
    refreshTodos();
  };

  const completeTodo = async (todo) => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true,
    });
    refreshTodos();
  };

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    </>
  );
};

export default TodoView;
