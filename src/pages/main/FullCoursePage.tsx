import React, { useEffect, useState } from "react";
import CartCourse from "../../components/CartCourse";
import Pagination from "../../components/Pagination";
import { useGetCoursesMutation } from "../../services/courseApi";
import { useAppDispatch } from "../../app/hooks";
import { setLoading } from "../../features/userSlice";

function FullCoursePage() {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const [getCourses, { data, error, isLoading }] = useGetCoursesMutation();

  useEffect(() => {
    getCourses(page);
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  dispatch(setLoading(isLoading));

  return (
    <>
      <div className="container space-y-5 flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
        <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-indigo-700 uppercase bg-indigo-200 rounded-full">
          Watch And Learn with
        </p>
        <h2 className="flex justify-center font-sans text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
          <svg
            className="w-8 h-8 mt-1 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
          </svg>
          <span className="relative">Our Full Library of Courses</span>{" "}
        </h2>

        <div className="grid max-w-lg gap-x-20 gap-y-10 mx-auto mt-12 md:grid-cols-2 lg:grid-cols-3 md:max-w-none">
          {data?.courses.courses.map((course) => (
            <CartCourse
              id={course.id}
              key={course.id}
              author={course.tutor?.first_name + " " + course.tutor?.last_name}
              title={course.name}
              description={course.description}
              category={course.subject}
              review={course.price}
              thumbnail={course.thumbnail_path}
            />
          ))}
        </div>
        <Pagination
          numberOfPages={data?.courses.total_page || 0}
          currentPage={page}
          changePage={handlePageChange}
        />
      </div>
    </>
  );
}

export default FullCoursePage;
