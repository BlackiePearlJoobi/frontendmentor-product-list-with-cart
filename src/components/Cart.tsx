import { useState } from "react";
import { useCart } from "../CartContext";
import "./Cart.css";

interface CartProps {
  onConfirmOrder: () => void;
}

const Cart = ({ onConfirmOrder }: CartProps) => {
  const { cartItems, updateCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  let totalAmount = 0;
  let totalPrice = 0;

  Object.values(cartItems).forEach((product) => {
    totalAmount += product.amount;
    totalPrice += product.amount * parseFloat(product.price);
  });

  const deleteItem = (id: string): void => {
    updateCart(id, null);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart &#40;{totalAmount}&#41; </h2>
      {totalAmount === 0 ? (
        <div className="empty-cart">
          <img
            src={`${import.meta.env.BASE_URL}/assets/images/illustration-empty-cart.svg`}
            alt="Empty cart"
          />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <div className="cart-with-item">
          <section className="checkout-list">
            {Object.values(cartItems).map((product) => (
              <div className="item-hr-container" key={product.id}>
                <article className="cart-item">
                  <div className="name-amount-price-container">
                    <h4 className="item-name">{product.name}</h4>
                    <div className="amount-price-container">
                      <span className="amount">{product.amount}x</span>
                      <span className="unit-price">@ ${product.price}</span>
                      <span className="total">
                        $
                        {(product.amount * parseFloat(product.price)).toFixed(
                          2,
                        )}
                      </span>
                    </div>
                  </div>
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/images/${
                      isHovered
                        ? "icon-remove-item-circle-selected.svg"
                        : "icon-remove-item-circle.svg"
                    }`}
                    alt="item remove icon"
                    role="button"
                    tabIndex={0}
                    onClick={() => deleteItem(product.id)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        deleteItem(product.id);
                      }
                    }}
                  />
                </article>
                <hr></hr>
              </div>
            ))}
            <article className="order-total">
              <p>Order Total</p>
              <h3 className="total-price">${totalPrice.toFixed(2)}</h3>
            </article>
          </section>
          <div className="carbon-neutral-statement">
            <img
              src={`${import.meta.env.BASE_URL}/assets/images/icon-carbon-neutral.svg`}
              alt="carbon neutral sign"
            />
            <p>
              This is a <b>carbon-neutral</b> delivary
            </p>
          </div>
          <button
            className="confirm-order-btn"
            type="button"
            onClick={onConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
