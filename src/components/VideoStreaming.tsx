import React, { useCallback, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string; // URL video từ server
}

function VideoStreaming({ src }: VideoPlayerProps) {
  return (
    <>
      <video
        src={src}
        controls
        width={400}
        height={300}
        className="fixed top-0 left-0 z-50 w-full h-full bg-black"
      />
    </>
  );
}

export default VideoStreaming;
