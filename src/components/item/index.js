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
      <div className="Item-details">
        <span className="Item-code">{item.code}</span>
        <h3 className="Item-title">{item.title}</h3>
      </div>
      <div className="Item-actions">
        <span className="Item-price">{item.price.toLocaleString()} ₽</span>
        <Button className="Item=button" textButton="Добавить" onClick={callbacks.onAddToCart} />
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
