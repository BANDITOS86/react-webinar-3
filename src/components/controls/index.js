import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from '../button';
import { plural } from "../../utils";

function Controls({ onOpenCart, cartInfo }) {
  const itemCountText = cartInfo.count > 0
    ? `${cartInfo.count} ${plural(cartInfo.count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      })} / ${cartInfo.total.toLocaleString()} ₽`
    : "пусто";

  return (
    <div className="Controls">
      <div className="Controls-info">
        <span className="Controls-info__title">В корзине:</span>
        <span className="Controls-info__count">{itemCountText}</span>
      </div>
      <Button className="Controls-info__button" textButton="Перейти" onClick={onOpenCart} />
    </div>
  );
}

Controls.propTypes = {
  onOpenCart: PropTypes.func.isRequired,
  cartInfo: PropTypes.shape({
    count: PropTypes.number,
    total: PropTypes.number,
  }),
};

Controls.defaultProps = {
  cartInfo: { count: 0, total: 0 },
};

export default React.memo(Controls);
