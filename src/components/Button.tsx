import React from "react";
import PropTypes from "prop-types";

function Button(props: PropTypes.InferProps<typeof Button.propTypes>) {
  return (
    <button
      onClick={props.onClick}
      className={`${colorMap[props.variant]} py-2 px-4 rounded-lg border  
       font-medium transition-colors
      w-full ${props.fullWidth ? "block" : "inline-block"}
      `}
    >
      {props.label}
    </button>
  );
}

const colorMap: ColorMapType = {
  primary:
    "bg-sky-500 border-sky-500 text-white border-sky-500 hover:border-sky-600",
  secondary:
    "bg-slate-500 border-slate-500 text-white border-slate-500 hover:border-slate-600",
  danger:
    "bg-red-500 border-red-500 text-white border-red-500 hover:border-red-600",
  success:
    "bg-green-500 border-green-500 text-white border-green-500 hover:border-green-600",
  warning:
    "bg-yellow-500 border-yellow-500 text-white border-yellow-500 hover:border-yellow-600",
  info: "bg-blue-500 border-blue-500 text-white border-blue-500 hover:border-blue-600",
} as const;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(Object.keys(colorMap) as (keyof typeof colorMap)[])
    .isRequired,
  //   size: PropTypes.oneOf(["sm", "md", "lg"]),
  icon: PropTypes.element,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  type: "button",
  variant: "primary",
  size: "md",
  loading: false,
  loadingText: "Loading...",
  fullWidth: false,
};

interface ColorMapType {
  primary: string;
  secondary: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
}

export default Button;
