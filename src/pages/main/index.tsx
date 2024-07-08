/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import PropTypes, { element } from "prop-types";
import Navbar from "../../components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import { useCheckInitUserQuery } from "../../services/userApi";
import Notification from "../../components/Notification";
import stompClient, { connect } from "../../services/socketService";
import CallNotification from "../../components/CallNotification";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, setNotification } from "../../features/userSlice";
import { setStompClient } from "../../features/callSlice";
import Loading from "../../components/Loading";

function MainPage(props: PropTypes.InferProps<typeof MainPage.propTypes>) {
  const navigation = useNavigation();
  const { data: user, isError } = useCheckInitUserQuery();
  const [notiType, setNotiType] = useState<React.ReactNode>(null);
  const dispatch = useAppDispatch();
  const [timeVisible, setTimeVisible] = useState(5000);
  const { isNotification, notification } = useAppSelector(selectUser);

  // const [peerId, setPeerId] = useState("");
  // const [stream, setStream] = useState<any>();

  useEffect(() => {
    if (user) {
      connect();
      stompClient.onConnect = () => {
        stompClient.send(
          "/app/register",
          {},
          JSON.stringify({
            register: {
              user_id: user.account.user_id,
            },
          })
        );
        stompClient.subscribe(
          `/queue/incoming-call/${user.account.user_id}`,
          onIncomingCall
        );
        dispatch(setStompClient(stompClient));
      };
    }
  }, [user]);

  const onIncomingCall = (message: any) => {
    console.log("coming call", JSON.parse(message.body).incoming_call_request);
    const { from_user_id, caller_sdp_offer } = JSON.parse(
      message.body
    ).incoming_call_request;
    dispatch(
      setNotification({
        isNotification: true,
        element: (
          <CallNotification
            from_user_id={JSON.stringify(from_user_id)}
            caller_sdp_offer={JSON.stringify(caller_sdp_offer)}
          />
        ),
        timeVisible: 30000,
      })
    );

    // const peer = new SimplePeer({ initiator: false, trickle: false, stream });
    // peer.on("signal", (data) => {
    //   stompClient.send(
    //     "/app/call-accept",
    //     {},
    //     JSON.stringify({
    //       call_accept_request: {
    //         to_user_id: from_user_id,
    //         callee_sdp_answer: data,
    //       },
    //     })
    //   );
    // });
    // peer.on("stream", (stream) => {
    //   // peerVideo.srcObject = stream;
    // });

    // peer.signal(caller_sdp_offer);
  };

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
    }
  }, [isError, user]);

  return (
    <div className="relative">
      <Navbar account={user} />
      {notification && isNotification && (
        <Notification
          children={notification?.element}
          timeVisible={notification?.timeVisible | 0}
        />
      )}
      {/* <Calendar /> */}
      <Loading />
      <div
        className={`
        bg-gray-100
        ${navigation.state === "loading" ? "loading" : ""}
        h-full
      `}
        id="detail"
      >
        <Outlet />
      </div>
    </div>
  );
}

MainPage.propTypes = {};

export default MainPage;
