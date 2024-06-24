/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useCreateCourseMutation } from "../services/courseApi";
import { useAppDispatch } from "../app/hooks";
import { setNotification } from "../features/userSlice";
import MessageNotification from "./MessageNotification";

function CourseForm() {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    subject: string;
    price: number;
    thumbnail: File | null;
  }>({
    name: "",
    description: "",
    subject: "",
    price: 0,
    thumbnail: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    subject: "",
    price: "",
  });

  const dispatch = useAppDispatch();

  const [createCourse, { isSuccess, isError, error }] =
    useCreateCourseMutation();

  if (isSuccess) {
    dispatch(
      setNotification({
        isNotification: true,
        element: (
          <MessageNotification
            message="Course created successfully"
            variant="success"
          />
        ),
        timeVisible: 3000,
      })
    );
  }

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Xác thực đơn giản (bạn có thể mở rộng thêm)
    const newErrors = {
      name: "",
      subject: "",
      price: "",
    };
    if (!formData.name.trim()) newErrors.name = "Tên khóa học là bắt buộc";
    if (!formData.subject.trim()) newErrors.subject = "Chủ đề là bắt buộc";
    if (!formData.price || Number.isNaN(formData.price)) {
      newErrors.price = "Giá phải là số";
    }

    const check =
      newErrors.name === "" &&
      newErrors.subject === "" &&
      newErrors.price === "";

    if (!check) {
      setErrors(newErrors);
      return;
    }
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("subject", formData.subject);
    fd.append("price", String(formData.price));
    fd.append("thumbnail", formData.thumbnail || "");

    createCourse(fd);

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
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Trường Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Trường Description */}
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
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-blue-500"
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Trường Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>

        {/* Trường Thumbnail */}
        <div>
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
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
