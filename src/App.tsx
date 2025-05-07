import { useState, useMemo } from "react";
import data from "./data.json";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "./CartContext";
import AddToCartButton from "./components/AddToCartButton";
import Cart from "./components/Cart";
import Confirmation from "./components/Confirmation";

function App() {
  const { clearCart } = useCart();

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
  };

  const handleResetOrder = () => {
    clearCart();
    setOrderConfirmed(false);
  };

  const productList = useMemo(() => {
    return data.map((product) => ({
      ...product,
      id: uuidv4(),
      price: parseFloat(product.price).toFixed(2),
    }));
  }, [data]);

  return (
    <div className="wrapper">
      <main>
        <section>
          <h1>Desserts</h1>
          <div className="item-list">
            {productList.map((product) => (
              <article key={product.id}>
                <div className="img-btn-container">
                  <picture>
                    <source
                      srcSet={product.image.tablet}
                      media="(min-width: 641px)"
                    />
                    <source
                      srcSet={product.image.desktop}
                      media="(min-width: 1025px)"
                    />
                    <img src={product.image.mobile} alt={product.name} />
                  </picture>
                  <AddToCartButton
                    productId={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                  />
                </div>
                <div className="item-info-container">
                  <p className="category">{product.category}</p>
                  <h3 className="item-name">{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Cart onConfirmOrder={handleConfirmOrder} />
        {orderConfirmed && (
          <Confirmation
            productList={productList}
            resetOrder={handleResetOrder}
          />
        )}
      </main>
      <footer>
        <div className="attribution">
          Challenge by&nbsp;
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            aria-label="Learn more about challenges on frontendmentor.io"
          >
            Frontend Mentor
          </a>
          . Coded by&nbsp;
          <a
            href="https://www.frontendmentor.io/profile/BlackiePearlJoobi"
            aria-label="Visit BlackiePearlJoobi's developer profile on frontendmentor.io"
          >
            BlackiePearlJoobi
          </a>
          .
        </div>
      </footer>
    </div>
  );
}

export default App;
