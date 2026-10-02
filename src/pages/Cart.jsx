import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import shopBackground from "../assets/imageshop/shop-background.png";

import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  /* =====================================================
     LOAD CART
  ===================================================== */

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("lunanest-cart")) || [];

    setCartItems(savedCart);
  }, []);

  /* =====================================================
     SAVE CART
  ===================================================== */

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "lunanest-cart",
      JSON.stringify(updatedCart)
    );
  };

  /* =====================================================
     INCREASE QUANTITY
  ===================================================== */

  const increaseQuantity = (productName) => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === productName) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    saveCart(updatedCart);
  };

  /* =====================================================
     DECREASE QUANTITY
  ===================================================== */

  const decreaseQuantity = (productName) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.name === productName) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  /* =====================================================
     REMOVE PRODUCT
  ===================================================== */

  const removeProduct = (productName) => {
    const updatedCart = cartItems.filter(
      (item) => item.name !== productName
    );

    saveCart(updatedCart);
  };

  /* =====================================================
     CALCULATE TOTAL
  ===================================================== */

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="cart-hero"
        style={{
          backgroundImage: `url(${shopBackground})`,
        }}
      >

        <div className="cart-hero-overlay">

          <div className="cart-hero-content">

            <div className="cart-hero-logo">
              LunaNest.
            </div>

            <h1>
              Cart
            </h1>

            <div className="cart-breadcrumb">

              <Link to="/">
                Home
              </Link>

              <span>
                ›
              </span>

              <strong>
                Cart
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CART SECTION
      ===================================================== */}

      <section className="cart-section">

        <div className="cart-container">


          {/* =================================================
              CART TABLE
          ================================================= */}

          <div className="cart-table-wrapper">

            <div className="cart-table-header">

              <div className="cart-header-product">
                Product
              </div>

              <div>
                Price
              </div>

              <div>
                Quantity
              </div>

              <div>
                Subtotal
              </div>

              <div></div>

            </div>


            {/* =================================================
                EMPTY CART
            ================================================= */}

            {cartItems.length === 0 ? (

              <div className="cart-empty">

                <h2>
                  Your cart is empty
                </h2>

                <p>
                  Add some beautiful furniture to your cart.
                </p>

                <Link
                  to="/shop"
                  className="cart-empty-button"
                >
                  Continue Shopping
                </Link>

              </div>

            ) : (

              /* =================================================
                  CART PRODUCTS
              ================================================= */

              cartItems.map((item) => (

                <div
                  className="cart-product-row"
                  key={item.name}
                >


                  {/* PRODUCT */}

                  <div className="cart-product">

                    <div className="cart-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>

                    <span>
                      {item.name}
                    </span>

                  </div>


                  {/* PRICE */}

                  <div className="cart-price">

                    Rs.{" "}
                    {item.price.toLocaleString("en-IN")}
                    .00

                  </div>


                  {/* QUANTITY */}

                  <div className="cart-quantity">

                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        decreaseQuantity(item.name)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        increaseQuantity(item.name)
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* SUBTOTAL */}

                  <div className="cart-subtotal">

                    Rs.{" "}
                    {(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                    .00

                  </div>


                  {/* DELETE */}

                  <button
                    type="button"
                    className="cart-delete"
                    aria-label={`Remove ${item.name}`}
                    onClick={() =>
                      removeProduct(item.name)
                    }
                  >
                    🗑
                  </button>

                </div>

              ))

            )}

          </div>


          {/* =================================================
              CART TOTALS
          ================================================= */}

          <div className="cart-totals">

            <h2>
              Cart Totals
            </h2>


            <div className="cart-total-row">

              <span>
                Subtotal
              </span>

              <strong>
                Rs.{" "}
                {cartSubtotal.toLocaleString("en-IN")}
                .00
              </strong>

            </div>


            <div className="cart-total-row cart-total-final">

              <span>
                Total
              </span>

              <strong>
                Rs.{" "}
                {cartSubtotal.toLocaleString("en-IN")}
                .00
              </strong>

            </div>


            {cartItems.length > 0 ? (

              <Link
                to="/checkout"
                className="cart-checkout-button"
              >
                Check Out
              </Link>

            ) : (

              <button
                type="button"
                className="cart-checkout-button"
                disabled
              >
                Check Out
              </button>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="cart-benefits">


        <div className="cart-benefit">

          <div className="cart-benefit-icon">
            ✦
          </div>

          <div>

            <h3>
              High Quality
            </h3>

            <p>
              Crafted from top materials
            </p>

          </div>

        </div>


        <div className="cart-benefit">

          <div className="cart-benefit-icon">
            🛡
          </div>

          <div>

            <h3>
              Warranty Protection
            </h3>

            <p>
              Over 2 years
            </p>

          </div>

        </div>


        <div className="cart-benefit">

          <div className="cart-benefit-icon">
            🚚
          </div>

          <div>

            <h3>
              Free Shipping
            </h3>

            <p>
              Order over ₹5,000
            </p>

          </div>

        </div>


        <div className="cart-benefit">

          <div className="cart-benefit-icon">
            ☎
          </div>

          <div>

            <h3>
              24 / 7 Support
            </h3>

            <p>
              Dedicated support
            </p>

          </div>

        </div>


      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="cart-footer">

        <div className="cart-footer-main">


          {/* BRAND */}

          <div className="cart-footer-brand">

            <h2>
              LunaNest
            </h2>

            <p>
              Furniture that helps you create
              your dream home.
            </p>

            <p className="cart-footer-address">

              400 University Drive Suite 200
              <br />

              Coral Gables, FL 33134

            </p>

          </div>


          {/* LINKS */}

          <div className="cart-footer-column">

            <h3>
              Links
            </h3>

            <Link to="/">
              Home
            </Link>

            <Link to="/shop">
              Shop
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>


          {/* HELP */}

          <div className="cart-footer-column">

            <h3>
              Help
            </h3>

            <a
              href="#"
              onClick={(event) =>
                event.preventDefault()
              }
            >
              Payment Options
            </a>

            <a
              href="#"
              onClick={(event) =>
                event.preventDefault()
              }
            >
              Returns
            </a>

            <a
              href="#"
              onClick={(event) =>
                event.preventDefault()
              }
            >
              Privacy Policies
            </a>

            <a
              href="#"
              onClick={(event) =>
                event.preventDefault()
              }
            >
              Terms & Conditions
            </a>

          </div>


          {/* NEWSLETTER */}

          <div className="cart-footer-newsletter">

            <h3>
              Newsletter
            </h3>

            <form
              className="cart-newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();

                alert(
                  "Thank you for subscribing to LunaNest!"
                );

                event.target.reset();
              }}
            >

              <input
                type="email"
                placeholder="Enter your email"
                required
              />

              <button type="submit">
                SUBSCRIBE
              </button>

            </form>

          </div>

        </div>


        {/* FOOTER BOTTOM */}

        <div className="cart-footer-bottom">

          <p>
            © 2026 LunaNest. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Cart;