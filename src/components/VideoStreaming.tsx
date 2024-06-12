import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGetVideoQuery } from "../services/courseApi";
import { CourseVideoResponse } from "../const/dtos";

interface VideoPlayerProps {
  courseId: number;
  videoId: number;
  isShow: boolean;
  handleVideoClickSelected: (video?: CourseVideoResponse) => void;
}

function VideoStreaming({
  courseId,
  videoId,
  isShow,
  handleVideoClickSelected,
}: // ,
VideoPlayerProps) {
  const { data } = useGetVideoQuery({ courseId, videoId });
  const [showBackdrop, setShowBackdrop] = useState(isShow);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backdropRef.current) {
      // Chỉ xử lý khi click vào backdrop
      setShowBackdrop(false);
      setIsVideoPaused(false);
      handleVideoClickSelected();
      // Reset trạng thái dừng video khi tắt backdrop
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsVideoPaused(!isVideoPaused);
    }
  };

  return (
    <>
      {showBackdrop && (
        <div
          ref={backdropRef}
          className="backdrop-opacity-10 backdrop-invert bg-white/30 h-screen w-screen fixed z-50 bg-black top-0 left-0 flex justify-center items-center"
          onClick={handleBackdropClick}
        >
          <video
            ref={videoRef}
            src={data}
            controls={!isVideoPaused} // Chỉ hiển thị nút điều khiển khi video không bị tạm dừng
            className="inline-block w-3/4 h-3/4"
            autoPlay
            onClick={() => handleVideoClick()} // Xử lý sự kiện click vào video
          />
        </div>
      )}
    </>
  );
}

export default VideoStreaming;
