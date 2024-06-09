import React from "react";
import PropTypes from "prop-types";

function TextField(props: PropTypes.InferProps<typeof TextField.propTypes>) {
  const { label, type, onChange, placeholder, disabled, length, fieldName } =
    props;

  return (
    <>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
        <input
          {...(props.register && props.register(fieldName))}
          type={type}
          disabled={disabled || false}
          onChange={onChange}
          placeholder={placeholder || ""}
          minLength={length || 0}
          className="block w-full mt-1 px-3 py-3 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                "
        />
      </label>
    </>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  length: PropTypes.number,
  register: PropTypes.func,
  fieldName: PropTypes.string.isRequired,
};

export default TextField;
