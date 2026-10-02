import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("lunanest-cart")) || [];

    setCartItems(savedCart);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw4NaKtuUsPsXMlDKTs2hbtTlGitXlRaeBBjFVki4D7i-DcXprhlAGK3uhMx1CryjaPtg/exec";

const handleSubmit = async (event) => {
  event.preventDefault();

  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    navigate("/cart");
    return;
  }

  // Create a unique order ID
  const orderId = `LN-${Date.now()}`;

  // Convert cart products into readable text
  const products = cartItems
    .map((item) => `${item.name} x${item.quantity}`)
    .join(", ");

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        type: "order",
        orderId: orderId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        products: products,
        total: total,
        status: "Pending",
      }),
    });

    alert(`Order placed successfully!\nOrder ID: ${orderId}`);

    // Clear cart after sending order
    localStorage.removeItem("lunanest-cart");

    // Go back to home page
    navigate("/");
  } catch (error) {
    console.error("Order submission error:", error);

    alert(
      "Something went wrong while placing your order. Please try again."
    );
  }
};

  return (
    <>
      <Navbar />

      {/* CHECKOUT HERO */}
      <section className="checkout-hero">
        <div className="checkout-hero-content">
          <h1>Checkout</h1>

          <div className="checkout-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Checkout</span>
          </div>
        </div>
      </section>

      {/* CHECKOUT CONTENT */}
      <main className="checkout-container">

        {cartItems.length === 0 ? (
          <div className="checkout-empty">
            <h2>Your cart is empty</h2>

            <p>
              Add some furniture to your cart before checking out.
            </p>

            <Link to="/shop" className="checkout-shop-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-layout">

            {/* BILLING DETAILS */}
            <section className="billing-section">
              <h2>Billing Details</h2>

              <form onSubmit={handleSubmit}>

                <div className="checkout-row">

                  <div className="checkout-field">
                    <label>First Name</label>

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label>Last Name</label>

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="checkout-field">
                  <label>Country / Region</label>

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>Street Address</label>

                  <input
                    type="text"
                    name="address"
                    placeholder="House number and street name"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-row">

                  <div className="checkout-field">
                    <label>City</label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="checkout-row">

                  <div className="checkout-field">
                    <label>PIN Code</label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label>Phone</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="checkout-field">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="place-order-button"
                >
                  Place Order
                </button>

              </form>
            </section>

            {/* ORDER SUMMARY */}
            <section className="order-section">

              <h2>Your Order</h2>

              <div className="order-products">

                {cartItems.map((item) => (
                  <div
                    className="order-product"
                    key={item.name}
                  >
                    <div className="order-product-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span className="order-quantity">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="order-product-details">
                      <h3>{item.name}</h3>

                      <p>
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <strong>
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}

              </div>

              <div className="order-total-row">
                <span>Subtotal</span>

                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="order-total-row">
                <span>Shipping</span>

                <strong>Free</strong>
              </div>

              <div className="order-grand-total">
                <span>Total</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="payment-info">
                <h3>Payment</h3>

                <p>
                  Payment options will be available here.
                </p>
              </div>

            </section>

          </div>
        )}

      </main>
    </>
  );
}

export default Checkout;