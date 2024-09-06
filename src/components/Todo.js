import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux"; // Import the dispatch hook
import { fetchTodos, updateTodo, deleteTodo } from "../redux/todo/todoSlice"; // Import deleteTodo action


const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // Get the dispatch function
  const dispatch = useDispatch();

  // Update state when props change
  useEffect(() => {
    setUpdatedTitle(props.todo.title);
    setUpdatedDescription(props.todo.description);
  }, [props.todo]);

  // update a todo
  const updateTodoHandler = async () => {
    if (!updatedTitle.trim() || !updatedDescription.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }

    try {
      // Dispatch the updateTodo action to Redux
      await dispatch(updateTodo({
        id: props.todo.id,  // Pass the todo ID
        title: updatedTitle,
        description: updatedDescription,
      }));

      dispatch(fetchTodos()); // Re-fetch all todos to refresh the list

      console.log("Updated todo:", { id: props.todo.id, updatedTitle, updatedDescription });

      // Toggle editing mode off after successful update
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo. Please try again.");
    }
  };


  // delete a todo
  const deleteTodoHandler = async () => {
    try {
      // Dispatch the deleteTodo action with the todo ID
      await dispatch(deleteTodo(props.todo.id));
      dispatch(fetchTodos()); // Re-fetch all todos to refresh the list
      console.log("Deleted todo:", props.todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo. Please try again.");
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
            <span style={{ fontWeight: "bold", fontSize: "1.2em", color: "#333" }}>
              {props.todo.id} - {props.todo.title}
            </span>
            <span style={{ fontStyle: "italic", color: "#555" }}>
              : {props.todo.description}
            </span>

          </p>
          <button
            onClick={deleteTodoHandler}
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
