import React, { Children, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { invisibleNotification, selectUser } from "../features/userSlice";

export interface NotificationProps {
  children: React.ReactNode;
  timeVisible: number;
}

function Notification(props: NotificationProps) {
  const { isNotification } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(invisibleNotification());
    }, props.timeVisible);

    return () => clearTimeout(timer); // Cleanup timer khi component unmount
  }, [props.timeVisible]);

  if (!isNotification) return null;

  return (
    <div className="absolute z-10  right-0 top-30 h-fit">{props.children}</div>
  );
}

export default Notification;
