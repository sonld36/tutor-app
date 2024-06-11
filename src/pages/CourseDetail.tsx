import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CourseBanner from "../components/CourseBanner";
import CourseVideoList from "../components/CourseVideoList";
import ModalCourse from "../components/ModalCourse";
import { useGetCourseMutation } from "../services/courseApi";

function CourseDetail(
  props: PropTypes.InferProps<typeof CourseDetail.propTypes>
) {
  const [getCourse, { data }] = useGetCourseMutation();

  useEffect(() => {
    getCourse(props.courseId);
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

CourseDetail.propTypes = {
  courseId: PropTypes.number.isRequired,
};

export default CourseDetail;
