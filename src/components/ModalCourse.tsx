import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function ModalCourse(
  props: PropTypes.InferProps<typeof ModalCourse.propTypes>
) {
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 100; // Giả sử chiều cao của navbar là 100px

  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        const scrollY = window.scrollY;
        const modalTop = Math.max(navbarHeight, scrollY);
        modalRef.current.style.top = `${modalTop}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <div
        ref={modalRef}
        className="fixed to-0 right-0 h-screen w-96 bg-white p-6 shadow-lg transform translate-x-full transition-transform duration-300 z-10" // z-10 để modal luôn ở trên
      >
        <h2 className="text-xl font-semibold mb-4">Khóa học bao gồm:</h2>
        <ul className="list-none space-y-2">
          <li className="flex items-center">
            <svg className="w-5 h-5 mr-2">{/* Biểu tượng video */}</svg>
            <span>9 giờ video theo yêu cầu</span>
          </li>
          {/* ... các mục khác tương tự ... */}
        </ul>
      </div>
    </div>
  );
}

ModalCourse.propTypes = {};

export default ModalCourse;
