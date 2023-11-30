import React, { useRef } from "react";
import PropTypes from "prop-types";
import Head from "../head";
import CartItem from "../cart-item";
import useModal from "../../hooks/useModal";
import "./style.css";

function CartModal({ isOpen, onClose, items, total, removeFromCart }) {
  const modalRef = useRef();
  useModal(isOpen, onClose, ".Modal-content");

  return (
    isOpen && (
      <div className="Modal" ref={modalRef}>
        <div className="Modal-content">
          <Head title="Корзина" onClose={onClose} />
          {items && items.length > 0 ? (
            <div className="Cart-items">
              {items.map((item) => (
                <CartItem key={item.code} item={item} removeFromCart={removeFromCart} />
              ))}
              <div className="Cart-total">
                <div className="Cart-total__wrapper">
                  <span className="Cart-total__title">Итого:</span>
                  <span className="Cart-total__count">
                    {total.toLocaleString()} ₽
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <h3 className='Cart-empty'>Корзина пуста</h3>
          )}
        </div>
      </div>
    )
  );
}

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array,
  total: PropTypes.number,
  removeFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartModal);