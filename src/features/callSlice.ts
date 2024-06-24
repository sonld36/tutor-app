import { createSlice } from "@reduxjs/toolkit";
import { CallState } from "../const/types";
import { RootState } from "../app/store";

const inititalState: CallState = {
    peer: undefined,
    isCalling: false,
    peerId: "",
    localStream: undefined,
    remoteStream: undefined,
    stompClient: undefined,
    
};

export const callSlice= createSlice({
    name: "call",
    initialState: inititalState,
    reducers: {
        setPeer: (state, action) => {
            state.peer = action.payload;
        },
        setIsCalling: (state, action) => {
            state.isCalling = action.payload;
        },
        setPeerId: (state, action) => {
            state.peerId = action.payload;
        },
        setLocalStream: (state, action) => {
            state = {
                ...state,
                localStream: action.payload,
            };
        },
        setRemoteStream: (state, action) => {
            state = {
                ...state,
                remoteStream: action.payload,
            };
        },
        setStompClient: (state, action) => {
            state.stompClient = action.payload;
        },
    },
});

export const {
    setPeer,
    setIsCalling,
    setPeerId,
    setLocalStream,
    setRemoteStream,
    setStompClient,
} = callSlice.actions;

export const selectCall = (state: RootState) => state.call;

export default callSlice.reducer;