import React from "react";

interface AvatarProps {
  src: string;
  rounded?: boolean;
  onClick?: () => void;
}

function Avatar(props: AvatarProps) {
  const { src, rounded, onClick } = props;

  return (
    <>
      <img
        className={`w-10 h-10 ${rounded ? "rounded-full" : "rounded"}`}
        src={src}
        alt="Rounded avatar"
        onClick={onClick}
      />
    </>
  );
}

export default Avatar;
