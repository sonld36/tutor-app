/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import IconPresent from "./IconPresent";
import LinkUnderLine from "./LinkUnderLine";
import { Link, NavLink } from "react-router-dom";
import { AccountResponse } from "../const/dtos";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
// import SimplePeer from "simple-peer";

interface NavbarProps {
  account?: AccountResponse;
}

function Navbar(props: NavbarProps) {
  const { account } = props;

  return (
    <>
      <nav className="bg-gray-50 border-gray-200 shadow-md sticky z-10 top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-0 rtl:space-x-reverse"
          >
            <IconPresent size="vsm" />
            <span className="font-thin text-lg text-slate-800">Tutors</span>
          </Link>
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto md:order-3 space-x-3">
            {props.account ? (
              // <NavLink
              //   to={`/${account?.account.role.toLocaleLowerCase()}/${
              //     account?.account.user_id
              //   }`}
              // >

              // </NavLink>
              <Dropdown
                label={
                  <Avatar
                    src={`${
                      props.account.account.avatar_path
                        ? `http://localhost:8080/accounting/user/avatar?avatarPath=${props.account.account.avatar_path}`
                        : "https://th.bing.com/th/id/OIP.ItvA9eX1ZIYT8NHePqeuCgAAAA?rs=1&pid=ImgDetMain"
                    }`}
                    rounded
                    onClick={() => {}}
                  />
                }
                options={[
                  <>
                    <Link
                      to={`/${account?.account.role.toLocaleLowerCase()}/${
                        account?.account.user_id
                      }`}
                    >
                      <LinkUnderLine href="" Children="Profile" />
                    </Link>
                  </>,
                  <>
                    <Link to="/login">
                      <LinkUnderLine href="#" Children="Logout" />
                    </Link>
                  </>,
                ]}
              />
            ) : (
              <>
                <Link to="/register">
                  <LinkUnderLine href="#" Children="Đăng ký" />
                </Link>
                <Link to="/login">
                  <LinkUnderLine href="#" Children="Đăng nhập" />
                </Link>
              </>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-slate-600 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:hover:bg-gray-100 md:px-2 md:py-1"
                  aria-current="page"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-slate-600 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:hover:bg-gray-100 md:px-2 md:py-1 "
                >
                  Tutors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-slate-600 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:hover:bg-gray-100 md:px-2 md:py-1 "
                >
                  Groups
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
