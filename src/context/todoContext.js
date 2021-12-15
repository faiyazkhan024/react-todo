import { createContext, useReducer } from "react";

const TodoContext = createContext({
  id: "",
  text: "",
  dueTime: "",
  isCompleted: false,
});

// -----------------Start Readucer-----------------
const getTodo = (todos, payload) => {
  return [...todos, ...payload];
};

const createTodo = (todos, payload) => {
  return [...todos, payload];
};

const updateTodo = (todos, payload) => {
  return [...todos.filter((todo) => todo.id !== payload.id), payload];
};

const deleteTodo = (todos, payload) => {
  return todos.filter((todo) => todo.id !== payload.id);
};

const todoReducer = (todos, action) => {
  switch (action.type) {
    case "Get":
      return getTodo(todos, action.payload);
    case "Create":
      return createTodo(todos, action.payload);
    case "Update":
      return updateTodo(todos, action.payload);
    case "Delete":
      return deleteTodo(todos, action.payload);
    default:
      throw new Error("No such action defined");
  }
};
// -----------------End Readucer-----------------

export const TodoContextProvider = (props) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
