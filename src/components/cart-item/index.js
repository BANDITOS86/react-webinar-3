import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import "./style.css";

function CartItem({ item, removeFromCart }) {
  return (
    <div key={item.code} className="Cart-item">
      <div className="Cart-item__info">
        <span className="Cart-item__info-code">{item.code}</span>
        <span className="Cart-item__info-title">{item.title}</span>
      </div>
      <div className="Cart-item__wrapper">
        <div className="Cart-item__details">
          <span className="Cart-item__details-price">{(item.price * item.quantity).toLocaleString()} ₽</span>
          <span className="Cart-item__details-quantity">{item.quantity} шт.</span>
        </div>
        <Button textButton="Удалить" onClick={() => removeFromCart(item.code)} />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartItem);