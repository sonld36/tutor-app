import React from "react";
import PropTypes from "prop-types";
import { CourseResponse } from "../const/dtos";
import { useEnrollCourseMutation } from "../services/courseApi";
import {
  paymentApiSlice,
  useCreatePaymentMutation,
} from "../services/paymentApi";

interface CourseBannerProps {
  course?: CourseResponse;
}

function CourseBanner({ course }: CourseBannerProps) {
  const [enrollCourse] = useEnrollCourseMutation();

  const handleEnrollCourse = async () => {
    if (course) {
      await enrollCourse(course.id);
    }
  };
  return (
    <div className="bg-slate-800 text-white p-8 flex shadow-lg rounded-lg overflow-hidden px-72">
      {/* Phần nội dung */}
      <div className="flex-grow container space-y-3 pr-8 flex flex-col justify-center">
        {" "}
        {/* Thêm padding phải */}
        <h1 className="text-3xl font-bold tracking-tight">
          {" "}
          {/* Căn chỉnh chữ */}
          {course?.name}
        </h1>
        <p className="text-gray-400 text-base">
          {" "}
          {/* Kích thước chữ lớn hơn */}
          {course?.description}
        </p>
        <div className="flex items-center mt-2">
          {/* Hiển thị đánh giá bằng sao */}
          {/* ... (Thêm logic đánh giá sao ở đây) */}
          <span className="ml-2 text-gray-400">1 lượt đánh giá</span>
        </div>
        <p className="mt-2 text-gray-300">
          Tác giả: {course?.tutor.first_name}
        </p>{" "}
        {/* Màu chữ nhạt hơn */}
        <p className="text-gray-400 text-sm flex">Cập nhật lần cuối: {}</p>
      </div>

      {/* Phần giá và nút mua */}
      <div className="ml-8 flex flex-col items-center">
        {" "}
        {/* Căn giữa nội dung */}
        <div className="relative w-48 h-28 mb-4 rounded-lg overflow-hidden">
          <img
            src={`http://localhost:8080/courseapi/course/thumbnail?thumbnailPath=${course?.thumbnail_path}`}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
          <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity duration-300 rounded-lg">
            {" "}
            {/* Hiệu ứng hover */}
            <svg
              className="w-12 h-12 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
              </svg>
            </svg>
          </button>
        </div>
        <p className="text-2xl font-bold text-white">{course?.price} VNĐ</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg mt-4 transition-colors duration-300"
          onClick={handleEnrollCourse}
        >
          {" "}
          {/* Nút lớn hơn, hiệu ứng hover */}
          Tham gia lớp học
        </button>
      </div>
    </div>
  );
}

export default CourseBanner;
