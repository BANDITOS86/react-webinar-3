import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

function Head({ title, onClose }) {
  return (
    <div className="Head">
      <h2>{title}</h2>
      {onClose && (
        <Button textButton="Закрыть" onClick={onClose} />
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func,
};

export default React.memo(Head);
