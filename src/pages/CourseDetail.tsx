import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CourseBanner from "../components/CourseBanner";
import CourseVideoList from "../components/CourseVideoList";
import ModalCourse from "../components/ModalCourse";
import { useGetCourseMutation } from "../services/courseApi";
import { useParams } from "react-router-dom";

function CourseDetail() {
  const params = useParams();
  const [getCourse, { data }] = useGetCourseMutation();

  useEffect(() => {
    const { id: courseId } = params as { id: string };
    getCourse(Number.parseInt(courseId));
  }, []);
  return (
    <div>
      <CourseBanner course={data?.course} />
      <div className="w-fit px-64">
        <CourseVideoList courseVideos={data?.course.course_videos} />
      </div>
    </div>
  );
}

export default CourseDetail;
