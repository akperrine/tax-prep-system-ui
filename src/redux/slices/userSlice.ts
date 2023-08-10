import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILocation, IUser, IUserState } from "../../utils/interfaces";

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      console.log(action);
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateTaxDoc: (state, action) => {
      if (state.user) {
        state.user.taxDocuments = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateTaxDoc } = userSlice.actions;
export default userSlice.reducer;
