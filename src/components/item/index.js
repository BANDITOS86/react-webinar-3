import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button"

function Item({ item, onAddToCart }) {
  // Счётчик выделений
  const callbacks = {
    onAddToCart: () => {
      onAddToCart(item);
    },
  };

  return (
    <div className={"Item"} onClick={callbacks.onClick}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
        <span>{item.price} ₽</span>
      </div>
      <div className="Item-actions">
        <Button textButton="Доьавить" onClick={callbacks.onAddToCart} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
