import { useState, createContext, useEffect, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let extistingCart = localStorage.getItem("cart");
    if (extistingCart) {
      setCart(JSON.parse(extistingCart));
    }
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// makin own hook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
