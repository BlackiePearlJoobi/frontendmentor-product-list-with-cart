import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import "./CountButton.css";
import AddToCartButton from "./AddToCartButton";

interface ButtonProps {
  productId: string;
  name: string;
  category: string;
  price: string;
}

const CountButton: React.FC<ButtonProps> = ({
  productId,
  name,
  category,
  price,
}) => {
  const { cartItems, updateCart } = useCart();
  const [count, setCount] = useState(cartItems[productId]?.amount || 1);

  useEffect(() => {
    if (!cartItems[productId]) {
      setCount(1);
    }
  }, [cartItems, productId]);

  const addItem = () => {
    const updatedAmount = count + 1;
    setCount(updatedAmount);

    const existingItem = cartItems[productId] || {
      id: null,
      name: null,
      category: null,
      price: null,
      amount: 0,
    };

    updateCart(productId, {
      ...existingItem,
      id: productId,
      name: name,
      category: category,
      price: price,
      amount: updatedAmount,
    });
  };

  const removeItem = () => {
    const updatedAmount = Math.max(count - 1, 0);
    setCount(updatedAmount);

    if (updatedAmount === 0) {
      updateCart(productId, null);
      setCount(1);
    } else {
      updateCart(productId, {
        ...cartItems[productId],
        amount: updatedAmount,
      });
    }
  };

  return !cartItems[productId] ? (
    <AddToCartButton
      productId={productId}
      name={name}
      category={category}
      price={price}
    />
  ) : (
    <div className="add-to-cart-btn is-clicked" role="button">
      <img
        src="./frontendmentor-product-list-with-cart/src/assets/images/icon-decrement-quantity.svg"
        alt="Decrement counter"
        className="decrement-btn"
        role="button"
        onClick={removeItem}
      />
      <span>{count}</span>
      <img
        src="./frontendmentor-product-list-with-cart/src/assets/images/icon-increment-quantity.svg"
        alt="Increment counter"
        className="increment-btn"
        role="button"
        onClick={addItem}
      />
    </div>
  );
};

export default CountButton;
