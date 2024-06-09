import React from "react";
import PropTypes from "prop-types";

function IconPresent(
  props: PropTypes.InferProps<typeof IconPresent.propTypes>
) {
  return (
    <div>
      <img
        src="https://cdn1.iconfinder.com/data/icons/online-education-131/1000/home_schooling_08-512.png"
        alt="icon"
        className={`mx-auto ${sizeMap[props.size]}`}
      />
    </div>
  );
}
const sizeMap: SizeMapType = {
  vsm: "w-16 h-16",
  sm: "w-20 h-20",
  md: "w-24 h-24",
  lg: "w-28 h-28",
} as const;

IconPresent.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizeMap) as (keyof typeof sizeMap)[])
    .isRequired,
};

interface SizeMapType {
  vsm: string;
  sm: string;
  md: string;
  lg: string;
}

export default IconPresent;
