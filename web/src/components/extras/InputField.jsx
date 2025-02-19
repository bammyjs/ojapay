import PropTypes from "prop-types";

const InputField = ({
  name,
  value,
  handleChange,
  placeholder,
  otherStyles,
  labelTitle,
  type,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-white mb-1 text-sm font-medium">
        {labelTitle}
      </label>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${otherStyles} text-white w-full p-2 mb-2 border border-gray-300 rounded`}
      />
    </div>
  );
};

InputField.PropTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  otherStyles: PropTypes.any,
};
export default InputField;
