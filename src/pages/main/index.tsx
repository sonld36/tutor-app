import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import CoursePage from "./CoursePage";
import TutorPage from "./TutorPage";

function MainPage(props: PropTypes.InferProps<typeof MainPage.propTypes>) {
  return (
    <div>
      <Navbar />
      <div className="py-12 bg-gray-100">
        <CoursePage />
        <TutorPage />
      </div>
    </div>
  );
}

MainPage.propTypes = {};

export default MainPage;
