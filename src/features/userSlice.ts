import { createSlice } from "@reduxjs/toolkit";
import { Gender, NotificationType, UserState } from "../const/types";

const inititalState: UserState = {
    username: "",
    email: "",
    userId: "",
    birth: "",
    gender: Gender.MALE,
    address: "",
    avatarPath: "",
    isNotification: false,
    notification: undefined,
    isLoading: false,
};

export const userSlice= createSlice({
    name: "user",
    initialState: inititalState,
    reducers: {
        setNotification: (state, action) => {
            console.log("setNotification", action.payload);
            
            state.notification = {
                ...state.notification,
                notificationType: action.payload.notificationType,
                element: action.payload.element,
                timeVisible: action.payload.timeVisible,
            }
            state.isNotification = true
        },

        invisibleNotification: (state) => {
            state.isNotification = false
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },


    },
});

export const {
    invisibleNotification,
    setNotification,
    setLoading,
} = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
