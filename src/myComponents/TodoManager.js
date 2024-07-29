import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";

import TodoListView from "./TodoListView";

const TodoManager = () => {
  const [todoList, setTodoList] = useState([{}]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Read all todos
  useEffect(() => {
    axios
      .get("https://fastapi-todo-crud-mongodb.onrender.com/api/todos")
      .then((res) => {
        setTodoList(res.data);
      });
  }, []); // Empty dependency array

  // Post a todo

  const addTodoHandler = () => {
     // Check if both title and description are not empty
        if (title.trim() === "" || desc.trim() === "") {
            alert("Both title and description are required.")
            console.log("Both title and description are required.");
            return;
        }

        axios.post('https://fastapi-todo-crud-mongodb.onrender.com/api/todo', {
            title: title,
            description: desc
        })
            .then(function (response) {
                // Clear the state only if the response is successful
                setTitle("");
                setDesc("");
                console.log("Todo added:", response.data); // More descriptive debugging
            })
            .catch(function (error) {
                console.log("Error adding todo:", error); // More descriptive debugging
            });

        // Fetch the updated todo list after successfully adding a new todo
        axios
          .get("https://fastapi-todo-crud-mongodb.onrender.com/api/todos")
          .then((res) => {
            setTodoList(res.data);
          })
          .catch((error) => {
            console.log("Error fetching todos after adding new todo ", error);
          });
      })
      .catch((error) => {
        console.error("Error adding new todo:", error);
      });
  };

  // Delete a todo

  const deleteTodoHandler = (title) => {
    axios
      .delete(
        `https://fastapi-todo-crud-mongodb.onrender.com/api/todo/delete/${title}`
      )
      .then((res) => {
        console.log(res);
        // Fetch the updated todo list after successfully adding a new todo
        axios
          .get("https://fastapi-todo-crud-mongodb.onrender.com/api/todos")
          .then((res) => {
            setTodoList(res.data);
          })
          .catch((error) => {
            console.log("Error fetching todos after deleting a todo ", error);
          });
      });
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
              className="mb-2 form-control titleIn"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
            />
            <input
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
              deleteTodoHandler={deleteTodoHandler}
              // setTodoList={setTodoList}
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
