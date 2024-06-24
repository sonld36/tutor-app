import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = Stomp.over(
  () =>
    new SockJS("http://localhost:8080/signaling")
);

stompClient.reconnect_delay = 5000;


export const connect = (userId: string) => {
  stompClient.connect(
    {
      "simpSessionId": userId,
    },
    () => {
      console.log("connected");
    },
  );
}

export default stompClient;
