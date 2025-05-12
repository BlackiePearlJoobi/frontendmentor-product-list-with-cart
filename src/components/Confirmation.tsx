import { useCart } from "../CartContext";
import "./Confirmation.css";

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: string;
}

type ProductList = Product[];

interface ConfirmationProps {
  productList: ProductList;
  resetOrder: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  productList,
  resetOrder,
}) => {
  const { cartItems } = useCart();

  let totalPrice = 0;

  Object.values(cartItems).forEach((product) => {
    totalPrice += product.amount * parseFloat(product.price);
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <img
          src="./frontendmentor-product-list-with-cart/src/assets/images/icon-order-confirmed.svg"
          alt="Confirm icon"
        />
        <h1>Order Confirmed</h1>
        <p className="thanks-message">We hope you enjoy your food!</p>
        <section className="checkout-list">
          {Object.values(cartItems).map((product) => {
            const productDetails = productList.find(
              (item) => item.name === product.name,
            );
            return (
              <div className="item-hr-container" key={product.id}>
                <article className="cart-item">
                  <img
                    src={productDetails?.image.thumbnail || ""}
                    alt={product.name}
                  />
                  <div className="name-amount-price-container">
                    <h4 className="item-name">{product.name}</h4>
                    <div className="amount-price-container">
                      <span className="amount">{product.amount}x</span>
                      <span className="unit-price">@ {product.price}</span>
                    </div>
                  </div>
                  <h3 className="total">
                    ${(product.amount * parseFloat(product.price)).toFixed(2)}
                  </h3>
                </article>
                <hr></hr>
              </div>
            );
          })}
          <article className="order-total">
            <p>Order Total</p>
            <h2 className="total-price">${totalPrice.toFixed(2)}</h2>
          </article>
        </section>
        <button className="start-new-order-btn" onClick={resetOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
