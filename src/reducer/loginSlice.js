import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    userData: null,
}

export const handleUserLogin = createAsyncThunk("auth/login", async({username, password}, {rejectWithValue}) =>{
    try{
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30, // optional, defaults to 60
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData.message || 'Login failed');
        }

        const data = await response.json();
        return data;
    } catch(error){
          return rejectWithValue(error.message || 'Network error');
    }
});

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(handleUserLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(handleUserLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
        }).addCase(handleUserLogin.rejected, (state, action) => {
            state.loading = false;
            state.error =action.payload;
        })
    }
})

export default loginSlice.reducer;