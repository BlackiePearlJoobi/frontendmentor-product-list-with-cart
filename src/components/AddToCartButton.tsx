import { useState, useRef } from "react";
import { useCart } from "../CartContext";
import "./AddToCartButton.css";
import CountButton from "./CountButton";

interface ButtonProps {
  productId: string;
  name: string;
  category: string;
  price: string;
}

const AddToCartButton: React.FC<ButtonProps> = ({
  productId,
  name,
  category,
  price,
}) => {
  const { cartItems, updateCart } = useCart();
  const [isClicked, setIsClicked] = useState(false);
  const incrementBtnRef = useRef<HTMLImageElement | null>(null);

  const startCount = () => {
    setIsClicked(true);

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
      amount: 1,
    });
  };

  return isClicked ? (
    <CountButton
      productId={productId}
      name={name}
      category={category}
      price={price}
      incrementBtnRef={incrementBtnRef}
    />
  ) : (
    <button className="add-to-cart-btn is-not-clicked" onClick={startCount}>
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/icon-add-to-cart.svg`}
        alt="Shopping cart icon"
      />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
