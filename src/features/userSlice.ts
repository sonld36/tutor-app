import { createSlice } from "@reduxjs/toolkit";
import { Gender, UserState } from "../const/types";

const inititalState: UserState = {
    username: "",
    email: "",
    userId: "",
    birth: "",
    gender: Gender.MALE,
    address: "",
    avatarPath: "",
};

export const userSlice= createSlice({
    name: "user",
    initialState: inititalState,
    reducers: {},
});

export const {} = userSlice.actions;

export const selectCount = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
