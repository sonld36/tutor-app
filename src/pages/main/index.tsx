import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import CoursePage from "./CoursePage";
import TutorPage from "./TutorPage";
import CourseBanner from "../../components/CourseBanner";
import CourseVideoList from "../../components/CourseVideoList";
import CourseDetail from "../CourseDetail";

function MainPage(props: PropTypes.InferProps<typeof MainPage.propTypes>) {
  return (
    <div>
      <Navbar />
      {/* <div className="py-12 bg-gray-100">
        <CoursePage />
        <TutorPage />
      </div> */}

      <CourseDetail courseId={24} />
    </div>
  );
}

MainPage.propTypes = {};

export default MainPage;
