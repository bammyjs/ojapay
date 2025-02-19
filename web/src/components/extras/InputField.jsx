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
      <label htmlFor={name} className="block mb-1 text-sm font-medium">
        {labelTitle}
      </label>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${otherStyles} w-full p-2 mb-2 border rounded`}
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
