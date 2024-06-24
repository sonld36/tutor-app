import React from "react";
import { CourseResponse } from "../const/dtos";

export interface CourseCardProps {
  course: CourseResponse;
  onClick: () => void;
}

function CourseCard(props: CourseCardProps) {
  const { course, onClick } = props;

  return (
    <>
      <div
        className="flex w-full overflow-hidden text-gray-900 bg-white rounded-lg shadow-lg md:max-w-3xl cursor-pointer"
        onClick={onClick}
      >
        <img
          src="https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80"
          alt="Computer with GitHub page opened in browser"
          className="hidden object-cover w-2/6 select-none sm:block"
        />
        <div className="flex flex-col justify-between w-full p-5">
          <div className="mb-5 break-all">
            <h2 className="mb-3 text-md font-black leading-tight md:leading-none">
              {course.name}
            </h2>
            <p className="leading-relaxed text-gray-700 text-sm md:truncate">
              {course.description}
            </p>
          </div>

          <div className="grid w-full grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-3">
            <span className="self-end font-semibold leading-none text-gray-500">
              {course.course_videos.length} videos
            </span>
            <progress value="0" max="100" className="w-full h-2 col-span-3">
              0% watched
            </progress>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCard;
