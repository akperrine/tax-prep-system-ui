import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action);
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        updateTaxDoc: (state, action) => {
            if (state.user) {
                state.user.taxDocuments?.push(action.payload);
            }
        },
    },
});
export const { setUser, clearUser, updateTaxDoc } = userSlice.actions;
export default userSlice.reducer;
