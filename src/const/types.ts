import { CompatClient, Stomp } from "@stomp/stompjs";
import SimplePeer from "simple-peer";

export interface UserState {
    username: string;
    email: string;
    userId: string;
    birth: string;
    gender: Gender;
    address: string;
    avatarPath: string;
    isNotification: boolean;
    notification?: NotificationState;
}

export enum Gender {
    MALE, FEMALE, OTHER
}

export interface NotificationState {
    notificationType: NotificationType;
    element: React.ReactNode;
    timeVisible: number;
}

export enum NotificationType {
    CALL, MESSAGE
}


export interface CallState {
    peer?: SimplePeer.Instance;
    isCalling: boolean;
    peerId: string;
    localStream?: MediaStream;
    remoteStream?: MediaStream;
    stompClient?: CompatClient;

}
