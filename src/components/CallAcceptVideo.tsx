/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCheckInitUserQuery } from "../services/userApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCall } from "../features/callSlice";
import stompClient, { connect } from "../services/socketService";

function CallAcceptVideo() {
  const myVideo = useRef<any>();
  const peerVideo = useRef<any>();
  const [searchParam, setSearchParams] = useSearchParams();

  const { data: user } = useCheckInitUserQuery();
  const { tutorId } = useParams<{ tutorId: string }>();
  const [stream, setStream] = useState<MediaStream>();
  const dispatch = useAppDispatch();
  const { remoteStream } = useAppSelector(selectCall);

  useEffect(() => {
    const acceptCall = async () => {
      const configuration: RTCConfiguration = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      };

      const pc = new RTCPeerConnection(configuration);

      try {
        const offer = JSON.parse(searchParam.get("caller_sdp_offer") || "");
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const sdpAnswer = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(sdpAnswer));
        connect();
        stompClient.onConnect = () => {
          stompClient.send(
            "/app/call-accept",
            {},
            JSON.stringify({
              call_accept_request: {
                to_user_id: searchParam.get("from_user_id")?.toString(),
                callee_sdp_answer: pc.localDescription,
              },
            })
          );

          pc.onicecandidate = (event) => {
            console.log("onicecandidate", event.candidate);

            if (event.candidate) {
              stompClient.send(
                "/app/candidate",
                {},
                JSON.stringify({
                  candidate: event.candidate,
                })
              );
            }
          };
        };

        pc.ontrack = (event) => {
          const remote = event.streams[0];
          peerVideo.current.srcObject = remote;
        };

        pc.addEventListener("connectionstatechange", (event) => {
          if (pc.connectionState === "connected") {
            console.log("connected");
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    // navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    //   setStream(stream);
    //   myVideo.current.srcObject = stream;
    // });
    peerVideo.current.srcObject = remoteStream;
    acceptCall();
  }, [tutorId, user?.account.user_id]);

  return (
    <>
      <video ref={myVideo} autoPlay playsInline />
      <video ref={peerVideo} autoPlay playsInline />
    </>
  );
}

export default CallAcceptVideo;
