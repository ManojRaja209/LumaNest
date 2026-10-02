import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import heroImage from "../assets/images/lunanest-hero-background.png";

import range1 from "../assets/images/range-1.png";
import range2 from "../assets/images/range-2.png";
import range3 from "../assets/images/range-3.png";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import product4 from "../assets/images/product-4.png";

import room1 from "../assets/images/room-1.png";
import room2 from "../assets/images/room-2.png";
import room3 from "../assets/images/room-3.png";
import room4 from "../assets/images/room-4.jpg";

import funiro1 from "../assets/images/funiro-1.jpg";
import funiro2 from "../assets/images/funiro-2.jpg";
import funiro3 from "../assets/images/funiro-3.jpg";
import funiro4 from "../assets/images/funiro-4.jpg";
import funiro5 from "../assets/images/funiro-5.jpg";
import funiro6 from "../assets/images/funiro-6.jpg";
import funiro7 from "../assets/images/funiro-7.jpg";
import funiro8 from "../assets/images/funiro-8.jpg";

import "./Home.css";

function Home() {
    const [cartMessage, setCartMessage] = useState("");
    const [likedProducts, setLikedProducts] = useState(() => {
  return JSON.parse(localStorage.getItem("lunanest-wishlist")) || [];
});
    const [roomSlide, setRoomSlide] = useState(0);
    const navigate = useNavigate();
    const roomSlides = [
  {
    image: room1,
    number: "01",
    category: "Bed Room",
    title: "Inner Peace",
  },
  {
    image: room2,
    number: "02",
    category: "Dining Room",
    title: "Warm Moments",
  },
  {
    image: room3,
    number: "03",
    category: "Living Room",
    title: "Modern Comfort",
  },
  {
    image: room4,
    number: "04",
    category: "Relaxing Space",
    title: "Natural Harmony",
  },
];

const nextRoomSlide = () => {
  setRoomSlide((previous) => (previous + 1) % roomSlides.length);
};

const goToRoomSlide = (index) => {
  setRoomSlide(index);
};
    const handleAddToCart = (product) => {
  const existingCart =
    JSON.parse(localStorage.getItem("lunanest-cart")) || [];

  const existingProductIndex = existingCart.findIndex(
    (item) => item.name === product.name
  );

  let updatedCart;

  if (existingProductIndex !== -1) {
    updatedCart = [...existingCart];

    updatedCart[existingProductIndex] = {
      ...updatedCart[existingProductIndex],
      quantity: updatedCart[existingProductIndex].quantity + 1,
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

  setCartMessage(`${product.name} added to cart!`);

  setTimeout(() => {
    setCartMessage("");
  }, 2000);
};

const handleLike = (productName) => {
  const products = {
    Syltherine: {
      name: "Syltherine",
      price: 2500,
      image: product1,
    },
    Leviosa: {
      name: "Leviosa",
      price: 2500,
      image: product2,
    },
    Lolito: {
      name: "Lolito",
      price: 7000,
      image: product3,
    },
    Respira: {
      name: "Respira",
      price: 5000,
      image: product4,
    },
  };

  const product = products[productName];

  if (!product) {
    return;
  }

  const currentWishlist =
    JSON.parse(localStorage.getItem("lunanest-wishlist")) || [];

  const alreadyLiked = currentWishlist.some(
    (item) => item.name === productName
  );

  let updatedWishlist;

  if (alreadyLiked) {
    updatedWishlist = currentWishlist.filter(
      (item) => item.name !== productName
    );
  } else {
    updatedWishlist = [
      ...currentWishlist,
      product,
    ];
  }

  localStorage.setItem(
    "lunanest-wishlist",
    JSON.stringify(updatedWishlist)
  );

  setLikedProducts(
    updatedWishlist.map((item) => item.name)
  );
  window.dispatchEvent(new Event("wishlistUpdated"));
};


const handleCompare = (productName) => {
  const products = {
    Syltherine: {
      name: "Syltherine",
      price: 2500,
      image: product1,
    },
    Leviosa: {
      name: "Leviosa",
      price: 2500,
      image: product2,
    },
    Lolito: {
      name: "Lolito",
      price: 7000,
      image: product3,
    },
    Respira: {
      name: "Respira",
      price: 5000,
      image: product4,
    },
  };

  const selectedProduct = products[productName];

  navigate("/comparison", {
    state: {
      selectedProduct,
    },
  });
};

const handleShare = async (productName) => {
  const shareData = {
    title: productName,
    text: `Check out ${productName} at Lunanest!`,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      // User cancelled sharing
    }
  } else {
    alert(`Share ${productName} with your friends!`);
  }
};
const handleBuyNow = () => {
    alert("Welcome to the Lunanest collection!");
};

return (
    <div className="home">
    <Navbar />

    {/* =========================
        HERO SECTION
      ========================= */}
    <section className="hero">
        {/* HERO IMAGE */}
        <div className="hero-image">
        <img
            src={heroImage}
            alt="Lunanest furniture collection"
        />
        </div>

        {/* HERO CONTENT */}
        <div className="hero-content">
        <p className="hero-label">
            New Arrival
        </p>

        <h1>
            Discover Our
            <br />
            New Collection
        </h1>

        <p className="hero-description">
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis.
        </p>

        <button
            className="hero-button"
            onClick={handleBuyNow}
        >
            BUY NOW
            <span className="hero-arrow">→</span>
        </button>
        </div>
    </section>

    {/* =========================
    BROWSE THE RANGE
========================= */}
<section className="browse-range">
  <div className="browse-header">
    <h2>Browse The Range</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
  </div>

  <div className="range-grid">

    <Link
      to="/shop"
      className="range-card"
      aria-label="Dining furniture"
    >
      <img
        src={range1}
        alt=""
      />

      <h3>Dining</h3>
    </Link>


    <Link
      to="/shop"
      className="range-card"
      aria-label="Living furniture"
    >
      <img
        src={range2}
        alt=""
      />

      <h3>Living</h3>
    </Link>


    <Link
      to="/shop"
      className="range-card"
      aria-label="Bedroom furniture"
    >
      <img
        src={range3}
        alt=""
      />

      <h3>Bedroom</h3>
    </Link>

  </div>
</section>
{/* =========================
    OUR PRODUCTS
========================= */}

<section className="products-section">

  <h2 className="products-title">
    Our Products
  </h2>

  <div className="products-grid">

    {/* PRODUCT 1 */}
    <div className="product-card">

      <div className="product-image-wrapper">

        <img
          src={product1}
          alt="Syltherine"
          className="product-image"
        />

        <div className="product-overlay">

          <button
            className="add-cart-button"
            onClick={() =>
  handleAddToCart({
    name: "Syltherine",
    price: 2500,
    image: product1,
  })
}
          >
            Add to cart
          </button>

          <div className="product-actions">

            <button
              onClick={() => handleShare("Syltherine")}
            >
              ↗ Share
            </button>

            <button
              onClick={() => handleCompare("Syltherine")}
            >
              ⇄ Compare
            </button>

            <button
              onClick={() => handleLike("Syltherine")}
              className={
                likedProducts.includes("Syltherine")
                  ? "liked"
                  : ""
              }
            >
              {likedProducts.includes("Syltherine")
                ? "♥ Liked"
                : "♡ Like"}
            </button>

          </div>

        </div>

      </div>

      <div className="product-info">

        <h3>Syltherine</h3>

        <p className="product-company">
          Lunanest
        </p>

        <p className="product-price">
          ₹2,500
        </p>

      </div>

    </div>


    {/* PRODUCT 2 */}
    <div className="product-card">

      <div className="product-image-wrapper">

        <img
          src={product2}
          alt="Leviosa"
          className="product-image"
        />

        <div className="product-overlay">

          <button
            className="add-cart-button"
            onClick={() =>
  handleAddToCart({
    name: "Leviosa",
    price: 2500,
    image: product2,
  })
}
          >
            Add to cart
          </button>

          <div className="product-actions">

            <button
              onClick={() => handleShare("Leviosa")}
            >
              ↗ Share
            </button>

            <button
              onClick={() => handleCompare("Leviosa")}
            >
              ⇄ Compare
            </button>

            <button
              onClick={() => handleLike("Leviosa")}
              className={
                likedProducts.includes("Leviosa")
                  ? "liked"
                  : ""
              }
            >
              {likedProducts.includes("Leviosa")
                ? "♥ Liked"
                : "♡ Like"}
            </button>

          </div>

        </div>

      </div>

      <div className="product-info">

        <h3>Leviosa</h3>

        <p className="product-company">
          Lunanest
        </p>

        <p className="product-price">
          ₹2,500
        </p>

      </div>

    </div>


    {/* PRODUCT 3 */}
    <div className="product-card">

      <div className="product-image-wrapper">

        <img
          src={product3}
          alt="Lolito"
          className="product-image"
        />

        <div className="product-overlay">

          <button
            className="add-cart-button"
            onClick={() =>
  handleAddToCart({
    name: "Lolito",
    price: 7000,
    image: product3,
  })
}
          >
            Add to cart
          </button>

          <div className="product-actions">

            <button
              onClick={() => handleShare("Lolito")}
            >
              ↗ Share
            </button>

            <button
              onClick={() => handleCompare("Lolito")}
            >
              ⇄ Compare
            </button>

            <button
              onClick={() => handleLike("Lolito")}
              className={
                likedProducts.includes("Lolito")
                  ? "liked"
                  : ""
              }
            >
              {likedProducts.includes("Lolito")
                ? "♥ Liked"
                : "♡ Like"}
            </button>

          </div>

        </div>

      </div>

      <div className="product-info">

        <h3>Lolito</h3>

        <p className="product-company">
          Lunanest
        </p>

        <p className="product-price">
          ₹7,000
        </p>

      </div>

    </div>


    {/* PRODUCT 4 */}
    <div className="product-card">

      <div className="product-image-wrapper">

        <img
          src={product4}
          alt="Respira"
          className="product-image"
        />

        <div className="product-overlay">

          <button
            className="add-cart-button"
            onClick={() =>
  handleAddToCart({
    name: "Respira",
    price: 5000,
    image: product4,
  })
}
          >
            Add to cart
          </button>

          <div className="product-actions">

            <button
              onClick={() => handleShare("Respira")}
            >
              ↗ Share
            </button>

            <button
              onClick={() => handleCompare("Respira")}
            >
              ⇄ Compare
            </button>

            <button
              onClick={() => handleLike("Respira")}
              className={
                likedProducts.includes("Respira")
                  ? "liked"
                  : ""
              }
            >
              {likedProducts.includes("Respira")
                ? "♥ Liked"
                : "♡ Like"}
            </button>

          </div>

        </div>

      </div>

      <div className="product-info">

        <h3>Respira</h3>

        <p className="product-company">
          Lunanest
        </p>

        <p className="product-price">
          ₹5,000
        </p>

      </div>

    </div>

  </div>


  <button
    className="show-more-button"
    onClick={() => alert("More products will be available soon!")}
  >
    Show More
  </button>

  {cartMessage && (
    <div className="cart-message">
      {cartMessage}
    </div>
  )}

</section>
{/* =========================
    ROOM INSPIRATION
========================= */}

<section className="room-inspiration">

  <div className="room-inspiration-content">

    {/* LEFT CONTENT */}

    <div className="room-inspiration-text">

      <h2>
        50+ Beautiful
        <br />
        rooms inspiration
      </h2>

      <p>
        Our designer already made a lot of beautiful
        prototype of rooms that inspire you
      </p>

      <Link
        to="/shop"
        className="explore-room-button"
      >
        Explore More
      </Link>

    </div>


    {/* CENTER / MAIN ROOM */}

    <div className="room-main-card">

      <img
        src={roomSlides[roomSlide].image}
        alt=""
        className="room-main-image"
      />

      <div className="room-info">

        <div className="room-info-text">

          <p>
            {roomSlides[roomSlide].number}
            <span> — </span>
            {roomSlides[roomSlide].category}
          </p>

          <h3>
            {roomSlides[roomSlide].title}
          </h3>

        </div>

        <button
          className="room-image-arrow"
          onClick={nextRoomSlide}
          aria-label="Next room"
        >
          →
        </button>

      </div>

    </div>


    {/* RIGHT IMAGE */}

    <div className="room-side-card">

      <img
  src={roomSlides[(roomSlide + 1) % roomSlides.length].image}
  alt=""
  className="room-side-image"
/>

      <button
        className="room-next-button"
        onClick={nextRoomSlide}
        aria-label="Next room"
      >
        →
      </button>

    </div>

  </div>


  {/* PAGINATION */}

  <div className="room-pagination">

    {roomSlides.map((_, index) => (
      <button
        key={index}
        className={`room-dot ${
          roomSlide === index ? "active" : ""
        }`}
        onClick={() => goToRoomSlide(index)}
        aria-label={`Go to room ${index + 1}`}
      />
    ))}

  </div>

</section>
{/* FUNIRO FURNITURE GALLERY */}
<section className="funiro-gallery">
  <div className="funiro-heading">
    <p>Share your setup with</p>
    <h2>#FuniroFurniture</h2>
  </div>

  <div className="funiro-gallery-wrapper">
    <div className="funiro-gallery-grid">
      <div className="funiro-image funiro-image-1">
        <img src={funiro1} alt="Furniture workspace" />
      </div>

      <div className="funiro-image funiro-image-2">
        <img src={funiro2} alt="Modern dining room" />
      </div>

      <div className="funiro-image funiro-image-3">
        <img src={funiro3} alt="Elegant bedroom" />
      </div>

      <div className="funiro-image funiro-image-4">
        <img src={funiro4} alt="Dining workspace" />
      </div>

      <div className="funiro-image funiro-image-5">
        <img src={funiro5} alt="Minimal furniture setup" />
      </div>

      <div className="funiro-image funiro-image-6">
        <img src={funiro6} alt="Modern furniture" />
      </div>

      <div className="funiro-image funiro-image-7">
        <img src={funiro7} alt="Interior furniture" />
      </div>

      <div className="funiro-image funiro-image-8">
        <img src={funiro8} alt="Furniture decoration" />
      </div>
    </div>
  </div>
</section>
{/* FOOTER */}
<footer className="site-footer">
  <div className="footer-container">

    {/* Brand */}
    <div className="footer-brand">
      <h1>Funiro.</h1>

      <p className="footer-address">
        Beasant Technologies Pvt Ltd
        <br />
        Chennai,
        <br />
        TamilNadu, India
      </p>
    </div>

    {/* Links */}
    <div className="footer-column">
      <h3>Links</h3>

      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>

    {/* Help */}
    <div className="footer-column">
      <h3>Help</h3>

      <button
        type="button"
        onClick={() => alert("Payment options will be available soon.")}
      >
        Payment Options
      </button>

      <button
        type="button"
        onClick={() => alert("Returns information will be available soon.")}
      >
        Returns
      </button>

      <button
        type="button"
        onClick={() => alert("Privacy policy will be available soon.")}
      >
        Privacy Policies
      </button>
    </div>

    {/* Newsletter */}
    <div className="footer-newsletter">
      <h3>Newsletter</h3>

      <form
        className="newsletter-form"
        onSubmit={(event) => {
          event.preventDefault();
          alert("Thank you for subscribing!");
        }}
      >
        <input
          type="email"
          placeholder="Enter Your Email Address"
          required
        />

        <button type="submit">
          SUBSCRIBE
        </button>
      </form>
    </div>

  </div>

  <div className="footer-bottom">
    <p>2023 funiro. All rights reserved</p>
  </div>
</footer>
    </div>
);
}

export default Home;