import axios from "axios";
import { appConstants } from "../appConstant";

// Base URL
const baseUrl = appConstants.apiUrl;

// Fetch all todos
export const getAllTodos = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/todos`);
        return data;
    } catch (err) {
        console.error("Error fetching todos:", err);
        throw err;
    }
};

// Add a new todo
export const addNewTodo = async () => {
    try {
        const { data } = await axios.post(`${baseUrl}/todo`, {
            title: "New Todo",
            description: "New Description"
        });
        return data;
    } catch (err) {
        console.error("Error adding new todo:", err);
        throw err;
    }
};
