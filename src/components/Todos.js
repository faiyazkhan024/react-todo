import React, { useEffect, useContext } from "react";
import TodoContext from "../context/todoContext";

import Todo from "./Todo";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodoContext);

  useEffect(() => {
    if (localStorage.getItem("todos") !== null)
      dispatch({
        type: "Get",
        payload: JSON.parse(localStorage.getItem("todos")),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (todos) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ul className="list-group">
      {todos?.map((todo, i) => {
        return <Todo key={i} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
