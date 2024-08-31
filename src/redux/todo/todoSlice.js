// redux/todo/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTodos, addNewTodo, updateTodoById, deleteTodoById } from '../../services/todoDataService';

// Async Thunks for asynchronous operations

// Fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const todos = await getAllTodos();
    return todos;
});

// Add a new todo
export const addTodo = createAsyncThunk('todos/addTodo', async ({ title, description }) => {
    const newTodo = await addNewTodo({ title, description });
    return newTodo;
});

// Update a todo by ID
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, title, description }) => {
    const updatedTodo = await updateTodoById({ id, title, description });
    return updatedTodo;
});

// Delete a todo by ID
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await deleteTodoById(id);
    return id;
});

// Todo slice
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Optional: You can add more reducers if needed
    },
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Add Todo
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update Todo
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete Todo
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(todo => todo.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default todoSlice.reducer;
