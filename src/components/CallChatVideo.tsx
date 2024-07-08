/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useCheckInitUserQuery } from "../services/userApi";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCall,
  setRemoteStream,
  setStompClient,
} from "../features/callSlice";
import stompClient, { connect } from "../services/socketService";
function CallChatVideo() {
  const myVideo = useRef<any>();
  const peerVideo = useRef<any>();
  const [searchParam, setSearchParams] = useSearchParams();

  const { data: user } = useCheckInitUserQuery();
  const { tutorId } = useParams<{
    tutorId: string;
  }>();

  const [stream, setStream] = useState<MediaStream>();
  const dispatch = useAppDispatch();
  const { remoteStream } = useAppSelector(selectCall);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });
    peerVideo.current.srcObject = remoteStream;
    connect();
  }, [tutorId, user?.account.user_id]);

  const startCall = async () => {
    const configuration: RTCConfiguration = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };

    const pc = new RTCPeerConnection(configuration);

    try {
      await pc.setLocalDescription(await pc.createOffer());
      connect();
      stompClient.send(
        "/app/call",
        {
          simpleSessionId: searchParam.get("sessionId"),
        },
        JSON.stringify({
          call_request: {
            to_user_id: tutorId,
            from_user_id: user?.account.user_id,
            sdp_offer: pc.localDescription,
          },
        })
      );

      stompClient.subscribe(
        `/queue/call-accepted/${user?.account.user_id}`,
        (message: any) => {
          const { sdp } = JSON.parse(message.body).call_accept_request
            .callee_sdp_answer;
          pc.setRemoteDescription(
            new RTCSessionDescription({
              type: "answer",
              sdp,
            })
          );

          pc.addEventListener("connectionstatechange", (event) => {
            if (pc.connectionState === "connected") {
              console.log("Peers connected!");
              
            }
          });

          pc.onicecandidate = (event) => {
            console.log("Sending ICE candidate to other peer", event.candidate);
            if (event.candidate) {
              stompClient.send(
                "/app/ice-candidate",
                {
                  simpleSessionId: searchParam.get("sessionId"),
                },
                JSON.stringify({
                  ice_candidate: {
                    to_user_id: tutorId,
                    from_user_id: user?.account.user_id,
                    candidate: event.candidate,
                  },
                })
              );
            }
          };
        }
      );
    } catch (error) {
      console.error(error);
    }

    pc.ontrack = (event) => {
      const remote = event.streams[0];
      peerVideo.current.srcObject = remote;
      dispatch(setRemoteStream(remote));
    };
  };

  return (
    <>
      <video ref={myVideo} autoPlay playsInline />
      <video ref={peerVideo} autoPlay playsInline />
      {searchParam.get("isRequest") === "true" && (
        <button onClick={startCall} className="bg-blue-500 text-white p-2">
          Call
        </button>
      )}
    </>
  );
}

export default CallChatVideo;
