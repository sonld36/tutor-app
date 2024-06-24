import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CourseBanner from "../components/CourseBanner";
import CourseVideoList from "../components/CourseVideoList";
import ModalCourse from "../components/ModalCourse";
import { useGetCourseQuery } from "../services/courseApi";
import { useParams } from "react-router-dom";
import { useCheckInitUserQuery } from "../services/userApi";

function CourseDetail() {
  const params = useParams();
  const { id: courseId } = params as { id: string };
  const { data: dataCourse } = useGetCourseQuery(Number.parseInt(courseId), {
    skip: courseId === undefined,
  });

  const { data: user } = useCheckInitUserQuery();
  const [viewMode, setViewMode] = useState<"owner" | "creator">("owner");

  useEffect(() => {
    if (user && dataCourse?.course) {
      if (
        user.account.role.toLocaleLowerCase() === "tutor" &&
        dataCourse?.course?.tutor.user_id === user.account.user_id
      ) {
        setViewMode("creator");
      }
    }
  }, [user, dataCourse?.course]);

  return (
    <div>
      <CourseBanner course={dataCourse?.course} viewMode={viewMode} />
      <div className="w-fit px-64">
        <CourseVideoList courseVideos={dataCourse?.course.course_videos} />
      </div>
    </div>
  );
}

export default CourseDetail;
