import { createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: string;
  amount: number;
}

// Define the shape of the cart context
interface CartContextType {
  cartItems: { [key: string]: CartItem };
  updateCart: (productId: string, item: CartItem | null) => void;
  clearCart: () => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to manage cart state
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: CartItem }>({});

  const updateCart = (productId: string, item: CartItem | null) => {
    setCartItems((prevCart) => {
      if (item === null) {
        // Remove item from cart when `null` is passed
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }

      return {
        ...prevCart,
        [productId]: item,
      };
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Reusable custom hook for using the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
