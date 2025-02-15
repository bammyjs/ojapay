import PropTypes from "prop-types";

export const LoadingButton = ({ isLoading, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="mb-6 btn btn-primary text-white w-full hover:btn-accent "
      style={{ position: "relative" }}
    >
      {isLoading ? (
        <div
          className="loader bg-primary loading loading-spinner loading-md"
          aria-hidden="true"
        ></div>
      ) : (
        children
      )}
    </button>
  );
};

LoadingButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
