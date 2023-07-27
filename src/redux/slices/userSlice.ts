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
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateLocation: (state, action: PayloadAction<ILocation>) => {
      if (state.user) {
        state.user.location = action.payload;
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
