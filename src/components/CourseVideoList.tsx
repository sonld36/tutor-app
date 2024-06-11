import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VideoCourse from "./VideoCourse";
import { CourseVideoResponse } from "../const/dtos";
import VideoStreaming from "./VideoStreaming";

interface CourseVideoListProps {
  courseVideos?: CourseVideoResponse[];
}

function CourseVideoList(props: CourseVideoListProps) {
  const [visibleSections, setVisibleSections] = useState<number>(5); // Hiển thị 5 mục ban đầu
  const [videoSrc, setVideoSrc] = useState<string>("");

  const handleVideoClick = (video: CourseVideoResponse, e: any) => {
    e.preventDefault();
    const url = `http://localhost:8080/courseapi/video/stream/${video.course_id}/${video.id}`;
    console.log(url);

    setVideoSrc(url);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 // Gần cuối trang
      ) {
        setVisibleSections(5); // Hiển thị tất cả
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-fit p-4 flex flex-wrap">
      {videoSrc !== "" && (
        <div className="w-1/2">
          <VideoStreaming src={videoSrc} />
        </div>
      )}
      <div>
        <h2 className="text-2xl text-slate-700 font-bold">Danh sách video</h2>
        <div className="my-4 space-y-5">
          {props.courseVideos?.slice(0, visibleSections).map((video) => (
            <VideoCourse
              key={video.id}
              video={video}
              handleVideoClick={handleVideoClick}
            />
          ))}
        </div>
        {visibleSections < 6 && (
          <button
            onClick={() => setVisibleSections(5)}
            className="bg-purple-500 text-white py-2 px-4 rounded mt-4"
          >
            Xem thêm
          </button>
        )}
      </div>
    </div>
  );
}

CourseVideoList.propTypes = {};

export default CourseVideoList;
