import React from "react";
import PropTypes from "prop-types";

function CartCourse(props: PropTypes.InferProps<typeof CartCourse.propTypes>) {
  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
        <div className="relative flex-shrink-0">
          <img
            className="object-cover w-full h-56"
            src="https://cdn.devdojo.com/episode/images/August2020/laravel-livewire-introduction1.jpg"
            alt="Cover image for livewire introduction course."
          />
          <span className="absolute bottom-0 right-0 inline-flex items-center px-3 py-1 mr-4 -mb-3 text-xs font-medium leading-tight text-gray-800 bg-gray-100 border rounded-full">
            ${props.review}
          </span>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-col justify-between flex-1 p-6 bg-white">
            <div>
              <a
                href="#"
                className="block text-xl font-semibold leading-7 text-gray-900"
              >
                {props.title}
              </a>
              <p className="mt-3 text-base leading-6 text-gray-500">
                {props.description}
              </p>
            </div>
            <p className="mt-3 text-sm font-medium leading-5">
              <a href="#" className="inline-block">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium leading-tight text-blue-800 bg-blue-100 rounded-full">
                  {props.category}
                </span>
              </a>
            </p>
          </div>
          <div className="flex items-center p-6 bg-gray-100">
            <div className="flex-shrink-0">
              <a href="#">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                  alt=""
                />
              </a>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium leading-5 text-gray-900">
                <a href="#" className="hover:underline">
                  Jane Cooper
                </a>
              </p>
              <div className="text-xs leading-5 text-gray-600">
                <time dateTime="2020-05-31">May 31, 2020</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CartCourse.propTypes = {
  review: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  category: PropTypes.string,
  author: PropTypes.instanceOf(Object),
};

export default CartCourse;
