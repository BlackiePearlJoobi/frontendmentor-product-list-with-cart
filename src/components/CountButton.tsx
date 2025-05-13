import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import "./CountButton.css";
import AddToCartButton from "./AddToCartButton";

interface ButtonProps {
  productId: string;
  name: string;
  category: string;
  price: string;
  incrementBtnRef: React.RefObject<HTMLImageElement | null>;
}

const CountButton: React.FC<ButtonProps> = ({
  productId,
  name,
  category,
  price,
  incrementBtnRef,
}) => {
  const { cartItems, updateCart } = useCart();
  const [count, setCount] = useState(cartItems[productId]?.amount || 1);
  const [minusIsHovered, setMinusIsHovered] = useState(false);
  const [plusIsHovered, setPlusIsHovered] = useState(false);

  useEffect(() => {
    if (!cartItems[productId]) {
      setCount(1);
      setMinusIsHovered(false);
      setPlusIsHovered(false);
    }
  }, [cartItems, productId]);

  useEffect(() => {
    if (incrementBtnRef.current) {
      incrementBtnRef.current.focus();
    }
  }, []);

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
    <div className="add-to-cart-btn is-clicked">
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/${
          minusIsHovered
            ? "icon-decrement-quantity-inverted.svg"
            : "icon-decrement-quantity.svg"
        }`}
        alt="Decrement counter"
        className="decrement-btn"
        role="button"
        tabIndex={0}
        onClick={removeItem}
        onMouseEnter={() => setMinusIsHovered(true)}
        onMouseLeave={() => setMinusIsHovered(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            removeItem();
          }
        }}
      />
      <span>{count}</span>
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/${
          plusIsHovered
            ? "icon-increment-quantity-inverted.svg"
            : "icon-increment-quantity.svg"
        }`}
        alt="Increment counter"
        className="increment-btn"
        role="button"
        tabIndex={0}
        onClick={addItem}
        onMouseEnter={() => setPlusIsHovered(true)}
        onMouseLeave={() => setPlusIsHovered(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addItem();
          }
        }}
        ref={incrementBtnRef}
      />
    </div>
  );
};

export default CountButton;
