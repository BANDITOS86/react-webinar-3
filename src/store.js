/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      nextItemCode: 1, // Начальное значение для кода следующей записи
      selectedCounts: {}, // Новое поле для отслеживания количества выделений
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
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
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Генерация уникального кода для новой записи
   */
  generateUniqueCode() {
    const existingCodes = new Set(this.state.list.map((item) => item.code));
    let newCode = this.state.nextItemCode || 1;

    for (; existingCodes.has(newCode); newCode++);

    return newCode;
  }

  /**
   * Генерация нового кода для следующей записи
   */
  generateNewCodeForNextItem() {
    const newCode = this.generateUniqueCode();

    this.setState({
      ...this.state,
      nextItemCode: newCode,
    });
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateUniqueCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: "Новая запись" }],
    });
  }

  /**
   * Удаление записи по коду
   */
  deleteItem(code) {
    const updatedList = this.state.list.filter((item) => item.code !== code);

    // Если удалена последняя запись, обновляем код и порядковый номер для новой записи
    if (this.state.list.length > updatedList.length) {
      this.generateNewCodeForNextItem();
    }

    this.setState({
      ...this.state,
      list: updatedList,
    });
  }

  /**
   * Выделение записи по коду
   */
  selectItem(code) {
    const selectedCounts = { ...this.state.selectedCounts };

    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Инвертируем значение selected для текущей записи
          item.selected = !item.selected;

          // Обновляем количество выделений для текущей записи
          selectedCounts[code] = selectedCounts[code] || 0;
          selectedCounts[code] += item.selected ? 1 : 0;
        } else {
          // Сбрасываем выделение для других записей
          item.selected = false;
        }
        return item;
      }),
      selectedCounts,
    });
  }
}

export default Store;
