import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, IUser } from "../../interfaces/interfaces";

const initialState: UserState = {
  status: "idle",
  user: undefined,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = undefined;
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<IUser>) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = undefined;
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
