import React from "react";

interface AvatarProps {
  src: string;
  rounded?: boolean;
}

function Avatar(props: AvatarProps) {
  const { src, rounded } = props;

  return (
    <>
      <img
        className={`w-10 h-10 ${rounded ? "rounded-full" : "rounded"}`}
        src={src}
        alt="Rounded avatar"
      />
    </>
  );
}

export default Avatar;
