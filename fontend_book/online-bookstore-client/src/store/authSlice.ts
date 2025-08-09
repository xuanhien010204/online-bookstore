import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const initialState = {
    isAuthenticated: !!token,
    user: null,
    token: token ? token : null
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
