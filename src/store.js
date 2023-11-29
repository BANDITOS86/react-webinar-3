import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object}
   */
  addToCart(item) {
    const { cart } = this.state;

    // Инициализируем объект cart, если его нет
    if (!cart) {
      this.state.cart = {
        items: [],
        count: 0,
        total: 0,
      };
    }

    const existingItem = this.state.cart.items.find(
      (cartItem) => cartItem.code === item.code
    );

    if (existingItem) {
      // Уже есть в корзине, увеличиваем количество
      existingItem.quantity += 1;
    } else {
      // Новый товар в корзине
      this.state.cart.items.push({ ...item, quantity: 1 });
    }

    // Пересчитываем общее количество и сумму в корзине
    const totalCount = this.state.cart.items.reduce(
      (count, cartItem) => count + cartItem.quantity,
      0
    );
    const totalAmount = this.state.cart.items.reduce(
      (amount, cartItem) => amount + cartItem.price * cartItem.quantity,
      0
    );

    // Обновляем состояние
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        count: totalCount,
        total: totalAmount,
      },
    });
  }

  removeFromCart(itemCode) {
    const itemToRemove = this.state.cart.items.find(
      (item) => item.code === itemCode
    );

    if (!itemToRemove) return;

    // Если количество больше 1, уменьшаем на 1, иначе удаляем полностью
    const updatedItems =
      itemToRemove.quantity > 1
        ? this.state.cart.items.map((item) =>
            item.code === itemCode
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        : this.state.cart.items.filter((item) => item.code !== itemCode);

    const updatedTotal = this.state.cart.total - itemToRemove.price;
    const updatedCount = updatedItems.reduce(
      (count, item) => count + item.quantity,
      0
    );

    const updatedCart = {
      ...this.state.cart,
      items: updatedItems,
      total: updatedTotal,
      count: updatedCount,
    };

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }
}

export default Store;
