import React from "react";

import { useEffect, useState } from "react";

import TodoListView from "./TodoListView";

import { getAllTodos , addNewTodo } from "../services/todoDataService";

const TodoManager = () => {
  const [todoList, setTodoList] = useState([{}]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");


  // Read all todos
  useEffect(() => {
    const fetchTodos = async () => {
        try {
            const todos = await getAllTodos();
            setTodoList(todos);
        } catch (err) {
            console.error("Failed to fetch todos:", err);
        }
    };

    fetchTodos();
}, []); // Empty dependency array means this effect runs once when component mounts


// Post a todo
const addTodoHandler = async () => {
  // Check if both title and description are not empty
  if (title.trim() === "" || desc.trim() === "") {
      alert("Both title and description are required.");
      console.log("Both title and description are required.");
      return;
  }

  try {
      // Post a new todo using the service function
      const newTodo = await addNewTodo({
          title: title,
          description: desc
      });

      // Clear the input fields if the response is successful
      setTitle("");
      setDesc("");
      console.log("Todo added:", newTodo);

      // Fetch the updated todo list after adding a new todo
      const todos = await getAllTodos();
      setTodoList(todos);
  } catch (error) {
      // Handle errors and provide feedback
      console.error("Error adding new todo:", error);
      alert("Failed to add new todo. Please try again.");
  }
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
          <div>
            <TodoListView
              todoList={todoList}
            />
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
