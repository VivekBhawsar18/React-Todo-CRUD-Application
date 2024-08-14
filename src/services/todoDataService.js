import axios from "axios";
import { appConstants } from "../appConstant";

// Base URL
const baseUrl = appConstants.apiUrl;

// Fetch all todos
export const getAllTodos = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/todos`);
        console.log("Todo fetched:", data); // Log the response data
        return data;
    } catch (err) {
        console.error("Error fetching todos:", err);
        throw err;
    }
};

// Add a new todo
export const addNewTodo = async ({ title, description }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/todo`, {
            title,
            description
        });
        console.log("Todo added:", data); 
        return data;
    } catch (err) {
        console.error("Error adding new todo:", err);
        throw err;
    }
};

// Update a todo by ID
export const updateTodoById = async ({id , title, description }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/todo/delete/${id}`, {
            title,
            description
        });
        console.log("Todo updated:", data); 
        return data;
    } catch (err) {
        console.error("Error updating todo:", err);
        throw err;
    }
}

// Delete a todo by ID
export const deleteTodoById = async (id) => {
    try {
        const { data } = await axios.delete(`${baseUrl}/todos/${id}`);
        console.log("Todo deleted:", data); 
        return data;
    } catch (err) {
        console.error("Error deleting todo:", err);
        throw new Error("Failed to delete todo. Please try again."); 
    }
};

