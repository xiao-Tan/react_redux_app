import React from "react";
import PropTypes from "prop-types";

function SelectInput(props) {
  const { name, label, value, onChange, error, options, defaultOption } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          className="form-control"
          name={name}
          onChange={onChange}
          value={value}
        >
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object),
};

export default SelectInput;
