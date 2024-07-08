import React from "react";
import Button from "./Button";
import { useCheckInitUserQuery } from "../services/userApi";

export interface AppointmentCardProps {
  avatarPath: string;
  tutorName: string;
  subject: string;
  timeStart: string;
  timeEnd: string;
  date: string;
  tutorId: string;
}

function AppointmentCard(props: AppointmentCardProps) {
  const { avatarPath, tutorName, subject, timeStart, timeEnd, date, tutorId } =
    props;

  const { data: user } = useCheckInitUserQuery();
  return (
    <>
      <div
        className="flex w-full overflow-hidden text-gray-900 bg-white rounded-lg shadow-lg md:max-w-3xl"
        onClick={() => {}}
      >
        <img
          src="https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80"
          alt="Computer with GitHub page opened in browser"
          className="hidden object-cover w-2/6 select-none sm:block"
        />
        <div className="flex flex-col justify-between w-full p-5 space-y-2">
          <div className="mb-5 break-all">
            <h2 className="mb-3 text-md font-black leading-tight md:leading-none">
              {tutorName}
            </h2>
            <p className="leading-relaxed text-gray-700 text-sm md:truncate">
              {subject}
            </p>
          </div>

          <div className="in grid w-full grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-3">
            <span className="self-end font-semibold leading-none text-gray-500">
              {timeStart}:00 - {timeEnd}:00 / {date}
            </span>
          </div>
          <div className="flex space-x-5">
            <Button
              label="Call"
              onClick={() => {
                window.open(
                  `http://localhost:5173/call/${tutorId}?isRequest=true&sessionId=${user?.account.user_id}`,
                  "_blank",
                  "width=800,height=600"
                );
              }}
            />
            <Button label="Cancel" onClick={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentCard;
