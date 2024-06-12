import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Calendar from "../../components/Calendar";
import { useCheckInitUserQuery } from "../../services/userApi";

function MainPage(props: PropTypes.InferProps<typeof MainPage.propTypes>) {
  const navigation = useNavigation();
  const { data: user, isLoading, isSuccess } = useCheckInitUserQuery();

  return (
    <>
    <Navbar />
    {/* <Calendar /> */}
      <div className={`
        bg-gray-100
        ${navigation.state === "loading" ? "loading" : ""}
        h-full
      `}
        id="detail"
      >
        <Outlet />
      </div></>
  );
}

MainPage.propTypes = {};

export default MainPage;
