import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";

function MainPage(props: PropTypes.InferProps<typeof MainPage.propTypes>) {
  const navigation = useNavigation();
  return (
    <div>
      <Navbar />
      <div className={`
        bg-gray-100
        ${navigation.state === "loading" ? "loading" : ""}
      `}
        id="detail"
      >
        <Outlet />
      </div>
    </div>
  );
}

MainPage.propTypes = {};

export default MainPage;
