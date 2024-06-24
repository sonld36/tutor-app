/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useCreateCourseVideoMutation } from "../services/courseApi";
import { useAppDispatch } from "../app/hooks";
import { setNotification } from "../features/userSlice";

export interface CourseVideoCreateType {
  video?: File;
  thumbnail?: File;
  title?: string;
  description?: string;
  courseId?: number;
}

export interface CourseVideoUploadProps {
  courseId: number;
}

function CourseVideoUpload({ courseId }: CourseVideoUploadProps) {
  const [formData, setFormData] = useState<CourseVideoCreateType>({
    video: undefined,
    thumbnail: undefined,
    title: "",
    description: "",
  });

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<{
    video: string;
    thumbnail: string;
    title: string;
  }>({
    video: "",
    thumbnail: "",
    title: "",
  });

  const [createVideoCourse, { isSuccess }] = useCreateCourseVideoMutation();

  if (isSuccess) {
    // Xử lý khi upload thành công
    dispatch(
      setNotification({
        isNotification: true,
        element: (
          <div className="bg-green-500 text-white p-2 rounded-md">
            Video uploaded successfully
          </div>
        ),
        timeVisible: 3000,
      })
    );
  }

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    console.log(name, value, files);

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  console.log("formData", formData);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Xác thực dữ liệu

    const newErrors = {
      video: "",
      thumbnail: "",
      title: "",
    };
    if (!formData.video) newErrors.video = "Video is required";
    if (!formData.thumbnail) newErrors.thumbnail = "Thumbnail is required";
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    const check =
      newErrors.video === "" &&
      newErrors.thumbnail === "" &&
      newErrors.title === "";
    if (!check) {
      setErrors(newErrors);

      return;
    }

    const fd = new FormData();
    fd.append("video", formData.video as File);
    fd.append("thumbnail", formData.thumbnail as File);
    fd.append("title", formData.title as string);
    fd.append("description", formData.description as string);
    fd.append("courseId", String(courseId));

    console.log("fd", fd);

    createVideoCourse(fd);

    // Gửi dữ liệu (ví dụ: sử dụng Axios hoặc Fetch)
    // ...
  };

  return (
    <div
      className="
    bg-white
    shadow-md
    rounded-md
    p-4
    space-y-4
    w-96
    mx-auto
    "
    >
      <h2 className="text-xl font-bold">Video information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className="
            space-y-1
        "
        >
          <label
            htmlFor="video"
            className="block text-sm font-medium text-gray-700"
          >
            Video
          </label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={handleChange}
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
          />
          {errors.video && (
            <p className="text-red-500 text-xs mt-1">{errors.video}</p>
          )}
        </div>

        <div
          className="
            space-y-1
        "
        >
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleChange}
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            py-2
            px-4"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default CourseVideoUpload;
