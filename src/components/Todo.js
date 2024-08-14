import axios from "axios";
import React, { useState, useEffect } from "react";

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // Update state when props change
  useEffect(() => {
    setUpdatedTitle(props.todo.title);
    setUpdatedDescription(props.todo.description);
  }, [props.todo]);

  const updateTodoHandler = async () => {
    try {
      const response = await axios.put(
        `https://fastapi-todo-crud-mongodb.onrender.com/api/todo/update/${props.todo.title}`,
        // `http://127.0.0.1:8000/api/todo/update/${props.todo.title}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      console.log(response.data); // Backend returns the updated todo object

      setIsEditing(false); // After successful update, toggle editing mode off

      // Update the todoList state in TodoManager component
      // props.setTodoList(response.data); // Update todoList state
    } catch (error) {
      console.error("Error updating todo:", error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            onChange={(e) => setUpdatedTitle(e.target.value)}
            value={updatedTitle}
            type="text"
          />
          <input
            onChange={(e) => setUpdatedDescription(e.target.value)}
            value={updatedDescription}
            type="text"
          />
          <button
            onClick={updateTodoHandler}
            className="btn btn-outline-success my-2 mx-2"
          >
            Update
          </button>
        </>
      ) : (
        <div>
          <p>
            <span style={{ fontWeight: "bold" }}> {props.todo.title} </span> :{" "}
            {props.todo.description}
          </p>
          <button
            onClick={() => props.deleteTodoHandler(props.todo.title)}
            className="btn btn-outline-danger my-2 mx-2"
          >
            delete
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-outline-primary my-2 mx-2"
          >
            Edit
          </button>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Todo;
