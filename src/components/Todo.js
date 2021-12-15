import React, { useContext, useEffect, useRef } from "react";

import TodoContext from "../context/todoContext";

const Todo = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const timerRef = useRef();

  const handleUpdate = () =>
    dispatch({
      type: "Update",
      payload: { ...todo, dueTime: "0", isCompleted: true },
    });

  const handleDelete = () => dispatch({ type: "Delete", payload: todo });

  const onDueTimeExp = () => {
    let time = parseInt(todo.dueTime);
    const inetervelRef = setInterval(() => {
      if (time === 0) {
        handleUpdate();
        return clearInterval(inetervelRef);
      }
      time = time - 1;
      dispatch({ type: "Update", payload: { ...todo, dueTime: time } });
    }, 1000);
  };

  timerRef.current = onDueTimeExp;

  useEffect(() => {
    timerRef.current();
  }, []);

  return (
    <li
      className={`list-group-item d-sm-flex flex-sm-row align-items-sm-center ${
        todo.isCompleted && "list-group-item-danger"
      }`}
    >
      <div className="d-flex flex-fill align-items-center mb-3 mb-sm-0">
        <h5 className="m-0 flex-fill">{todo.text}</h5>
        <p className="m-0 mx-md-5">
          {todo.dueTime}s <i className="bi bi-clock"></i>
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn m-2 bg-danger" onClick={handleDelete}>
          <i className="bi bi-trash text-white"></i>
        </button>
        {todo.isCompleted ? (
          ""
        ) : (
          <button className="btn m-2 bg-primary" onClick={handleUpdate}>
            <i className="bi bi-check-circle text-white"></i>
          </button>
        )}
      </div>
    </li>
  );
};

export default Todo;
