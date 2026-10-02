import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("lunanest-wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (productName) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.name !== productName
    );

    localStorage.setItem(
      "lunanest-wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);
  };

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("lunanest-cart")) || [];

    const existingIndex = existingCart.findIndex(
      (item) => item.name === product.name
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...existingCart];

      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + 1,
      };
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "lunanest-cart",
      JSON.stringify(updatedCart)
    );

    alert(product.name + " added to cart!");
  };

  return (
    <div className="wishlist-page">
      <Navbar />

      <section className="wishlist-hero">
        <h1>My Wishlist</h1>

        <p>
          <Link to="/">Home</Link>
          <span> &gt; </span>
          Wishlist
        </p>
      </section>

      <main className="wishlist-container">

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-heart">♡</div>

            <h2>Your wishlist is empty</h2>

            <p>
              Save your favorite furniture here and find them
              whenever you need them.
            </p>

            <Link to="/shop" className="wishlist-shop-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-heading">
              <h2>Saved Products</h2>

              <p>
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "product"
                  : "products"}{" "}
                saved
              </p>
            </div>

            <div className="wishlist-grid">
              {wishlist.map((product) => (
                <div
                  className="wishlist-card"
                  key={product.name}
                >
                  <div className="wishlist-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <button
                      className="wishlist-remove"
                      onClick={() =>
                        removeFromWishlist(product.name)
                      }
                    >
                      ♥
                    </button>
                  </div>

                  <div className="wishlist-info">
                    <h3>{product.name}</h3>

                    <p className="wishlist-price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <button
                      className="wishlist-cart-button"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default Wishlist;