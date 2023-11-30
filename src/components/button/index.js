import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Button({ textButton, onClick, className }) {
  return (
     <button className={`Button${className ? ` ${className}` : ''}`} onClick={onClick}>
      {textButton}
    </button>
  );
}

Button.propTypes = {
  textButton: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default React.memo(Button);