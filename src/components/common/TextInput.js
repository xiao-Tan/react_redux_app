import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
  const { name, placeholder, value, onChange, label, error } = props;
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          className="form-control"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
