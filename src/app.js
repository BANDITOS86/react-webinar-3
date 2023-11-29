import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";

function App({ store }) {
  const [isCartOpen, setCartOpen] = useState(false);

  const list = store.getState().list;
  const cartInfo = store.getState().cart;

  // Проверяю, существует ли cartInfo и есть ли у него свойство items
  const cartItems = cartInfo && cartInfo.items ? cartInfo.items : [];

  const callbacks = {
    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onAddToCart: useCallback((item) => {
        store.addToCart(item);
      }, [store]),
    onOpenCart: useCallback(() => {
      setCartOpen(true);
    }, []),
    onCloseCart: useCallback(() => {
      setCartOpen(false);
    }, []),
    removeFromCart: useCallback((itemCode) => {
        store.removeFromCart(itemCode);
      }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpenCart={callbacks.onOpenCart} cartInfo={cartInfo} />
      <CartModal
        isOpen={isCartOpen}
        onClose={callbacks.onCloseCart}
        items={cartItems} // Использую проверенное значение
        total={cartInfo ? cartInfo.total : 0} // Проверяю, существует ли cartInfo
        removeFromCart={callbacks.removeFromCart}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
    </PageLayout>
  );
}

export default App;
