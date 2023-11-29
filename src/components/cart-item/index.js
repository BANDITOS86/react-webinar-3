import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

function CartItem(props) {
  const callbacks = {
    onRemove: () => {
      props.onRemove(props.item.code);
    },
  };

  return (
    <div className={"CartItem"}>
      <div className="CartItem-title">
        {props.item.title}
        <span>{props.item.price} ₽</span>
      </div>
      <div className="CartItem-actions">
        <Button textButton="Удалить" onClick={callbacks.onRemove} />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
