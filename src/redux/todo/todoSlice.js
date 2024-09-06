import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTodos, addNewTodo, updateTodoById, deleteTodoById } from '../../services/todoDataService';

// Async Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', getAllTodos);
export const addTodo = createAsyncThunk('todos/addTodo', addNewTodo);
export const updateTodo = createAsyncThunk('todos/updateTodo', updateTodoById);
export const deleteTodo = createAsyncThunk('todos/deleteTodo', deleteTodoById);

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        const setLoading = (state) => { state.loading = true; state.error = null; };
        const setError = (state, action) => { state.loading = false; state.error = action.error.message; };

        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, setLoading)
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, setError)
            // Add Todo
            .addCase(addTodo.pending, setLoading)
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addTodo.rejected, setError)
            // Update Todo
            .addCase(updateTodo.pending, setLoading)
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateTodo.rejected, setError)
            // Delete Todo
            .addCase(deleteTodo.pending, setLoading)
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(todo => todo.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, setError);
    },
});

export default todoSlice.reducer;
