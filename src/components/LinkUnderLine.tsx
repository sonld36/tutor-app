import React, { useState } from "react";
import PropTypes from "prop-types";

function LinkUnderLine(
  props: PropTypes.InferProps<typeof LinkUnderLine.propTypes>
) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter: any = (event: MouseEvent) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleMouseLeave: any = (event: MouseEvent) => {
    event.preventDefault();
    setIsHovered(false);
  };

  return (
    <div className="bg-white min-w-screen">
      <a
        href={props.href || "#"}
        onMouseEnter={handleMouseEnter}
        onClick={props.onClick || (() => {})}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block text-base font-medium text-indigo-500"
      >
        <span className="block">{props.Children}</span>
        <span className="absolute bottom-0 left-0 inline-block w-full h-1 -mb-1 overflow-hidden">
          <span
            className={`absolute inset-0 inline-block w-full h-1 transform border-t-2 border-indigo-500 transition-transform duration-300 ease-out ${
              isHovered ? "translate-x-0" : "-translate-x-full"
            }`}
          />
        </span>
      </a>
    </div>
  );
}

LinkUnderLine.propTypes = {
  Children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  href: PropTypes.string,
};

export default LinkUnderLine;
