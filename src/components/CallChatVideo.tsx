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
import { connect } from "../services/socketService";
function CallChatVideo() {
  const myVideo = useRef<any>();
  const peerVideo = useRef<any>();
  const [searchParam, setSearchParams] = useSearchParams();

  const { data: user } = useCheckInitUserQuery();
  const { tutorId } = useParams<{ tutorId: string }>();
  const [stream, setStream] = useState<MediaStream>();
  const dispatch = useAppDispatch();
  const { remoteStream, stompClient } = useAppSelector(selectCall);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });
    peerVideo.current.srcObject = remoteStream;
    connect(user?.account.user_id || "");
    dispatch(setStompClient(stompClient));
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
      console.log("Offer setLocalDescription success", pc.localDescription);
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
