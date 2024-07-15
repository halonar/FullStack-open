//import React from "react";
import ShowTodo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      {todos
        .map((todo) => {
          return (
            <ShowTodo
              key={todo._id}
              todo={todo}
              onClickDelete={onClickDelete}
              onClickComplete={onClickComplete}
            />
          );
        })
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  );
};

export default TodoList;
