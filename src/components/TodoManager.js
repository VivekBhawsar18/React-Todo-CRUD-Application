import React from "react";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo } from "../redux/todo/todoSlice";

import TodoListView from "./TodoListView";


const TodoManager = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const todoList = useSelector((state) => state.todos.items);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  const dispatch = useDispatch();

  //   // Read all todos
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);


const addTodoHandler = async () => {
  if (title.trim() === "" || desc.trim() === "") {
    alert("Both title and description are required.");
    return;
  }

  dispatch(addTodo({ title, description: desc }));

  setTitle("");
  setDesc("");
};

  return (
    <div>
      <div
        className="App list-group-item  justify-content-center align-items-center mx-auto"
        style={{ width: "400px", backgroundColor: "white", marginTop: "15px" }}
      >
        <h1
          className="card text-white bg-primary mb-1"
          stylename="max-width: 20rem;"
        >
          Task Manager
        </h1>
        <h6 className="card text-white bg-primary mb-3">
          React - API - MongoDB
        </h6>
        <div className="card-body">
          <h5 className="card text-white bg-dark mb-3">Add Your Task</h5>
          <span className="card-text">
            <input
              type="text"
              value={title}
              className="mb-2 form-control titleIn"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
            />
            <input
              type="text"
              value={desc}
              className="mb-2 form-control desIn"
              onChange={(event) => setDesc(event.target.value)}
              placeholder="Description"
            />
            <button
              className="btn btn-outline-primary mx-2 mb-3"
              style={{ borderRadius: "50px", fontWeight: "bold" }}
              onClick={addTodoHandler}
            >
              Add Task
            </button>
          </span>
          <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <div>
            <TodoListView todoList={todoList} />
          </div>
        </div>
        <h6 className="card text-dark bg-warning py-1 mb-0">
          Copyright 2024, All rights reserved &copy;
        </h6>
      </div>
    </div>
  );
};

export default TodoManager;
