import React from "react";
import PropTypes from "prop-types";
import Head from '../head';
import Button from '../button';

function CartModal({ isOpen, onClose, items, total, removeFromCart }) {
  return (
    isOpen && (
      <div className="Modal">
        <div className="Modal-content">
          <Head title="Корзина" onClose={onClose} />
          {items && items.length > 0 ? (
            <div className="Cart-items">
              {items.map((item) => (
                <div key={item.code} className="Cart-item">
                  <span>{item.code}</span>
                  <span>{item.title}</span>
                  <span>Количество: {item.quantity}</span>
                  <span>Цена: {item.price * item.quantity} ₽</span>
                  <Button textButton="Удалить" onClick={() => removeFromCart(item.code)} />
                </div>
              ))}
              <div className="Cart-total">Итого: {total} ₽</div>
            </div>
          ) : (
            <p>Корзина пуста</p>
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

export default CartModal;
