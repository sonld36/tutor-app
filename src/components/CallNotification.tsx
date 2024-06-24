import React from "react";
import stompClient from "../services/socketService";
import { useAppDispatch } from "../app/hooks";
import { setRemoteStream } from "../features/callSlice";

export interface CallNotificationProps {
  from_user_id: string;
  caller_sdp_offer: string;
}

function CallNotification(props: CallNotificationProps) {
  const { from_user_id, caller_sdp_offer } = props;

  const onAcceptCall = async () => {
    window.open(
      `http://localhost:5173/call-accept/${from_user_id}?caller_sdp_offer=${caller_sdp_offer}&from_user_id=${from_user_id}`,
      "_blank",
      "width=800,height=600"
    );
  };

  return (
    <>
      <div className="flex flex-col h-fit pt-4 bg-gray-100 min-w-screen">
        <div className="w-full h-fit max-w-sm mx-auto my-2 overflow-hidden rounded shadow-sm">
          <div className="relative flex items-center justify-between px-2 py-2 font-bold text-white bg-blue-500">
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline w-6 h-6 mr-2 opacity-75"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span>Call Requesting...</span>
            </div>
            <span className="relative">
              <svg
                className="w-5 h-5 text-blue-300 fill-current hover:text-white"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
          <div className="p-3 bg-white border border-gray-300 rounded-b">
            <div className="flex justify-start mb-2">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
                  className="inline object-cover w-12 h-12 mr-2 rounded-full"
                />
              </div>
              <div>
                <p className="font-medium leading-tight text-gray-700">
                  {from_user_id}
                </p>
                <span className="block leading-tight text-gray-500">
                  Hey! hope you are doing fine.
                </span>
              </div>
            </div>
            <div className="block w-full mt-3 text-right space-x-2">
              <button className="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded-md hover:bg-gray-100 focus:outline-none">
                Ignore
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
                onClick={onAcceptCall}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallNotification;
