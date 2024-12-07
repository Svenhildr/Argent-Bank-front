import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    token: "",
    status: "idle" // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state = initialState, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
        },
        clearUser: (state = initialState) => {
            state.firstName = "";
            state.lastName = "";
            state.username = "";
            state.token = "";
            state.status = "idle";
        },
        setSignIn: (state = initialState, action) => {
            if (action.payload.token) {
                state.token = action.payload.token;
            }
        }
    }
});

export const { setUser, clearUser, setSignIn } = userSlice.actions;
export default userSlice.reducer;
