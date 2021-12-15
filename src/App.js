import React, { useState, useContext } from "react";

import TodoContext from "./context/todoContext";
import Todos from "./components/Todos";

const App = () => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  const { dispatch } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") return alert("Add Todo");

    const todo = {
      id: "id" + text + time,
      text: text,
      dueTime: time,
      isCompleted: false,
    };

    dispatch({ type: "Create", payload: todo });
    setText("");
    setTime("");
  };

  return (
    <div className="container py-5">
      <h1>Add Todo</h1>
      <form className="py-5 form-group" onSubmit={handleSubmit}>
        <label className="mb-4 d-block">
          Todo
          <input
            required
            type="text"
            value={text}
            placeholder="Create a PR"
            className="form-control"
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        <label className="mb-4 d-block">
          Due Time in sec
          <input
            required
            type="number"
            value={time}
            placeholder="120"
            className="form-control"
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <button className="btn btn-primary" variant="primary" type="submit">
          Submit
        </button>
      </form>

      <Todos />
    </div>
  );
};

export default App;
