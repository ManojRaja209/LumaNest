import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import shopBackground from "../assets/imageshop/shop-background.png";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import product4 from "../assets/images/product-4.png";

import "./Shop.css";

function Shop() {
  /* =========================================================
     SEARCH
  ========================================================= */

  const [searchParams] = useSearchParams();

  const searchQuery =
    searchParams.get("search") || "";

  /* =========================================================
     PRODUCTS
  ========================================================= */

  const products = [
    {
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: "₹2,500",
      oldPrice: "₹3,500",
      image: product1,
      badge: "-30%",
      badgeType: "discount",
    },
    {
      name: "Leviosa",
      description: "Stylish chair",
      price: "₹2,500",
      oldPrice: "",
      image: product2,
      badge: "",
      badgeType: "",
    },
    {
      name: "Lolito",
      description: "Luxury big sofa",
      price: "₹7,000",
      oldPrice: "₹14,000",
      image: product3,
      badge: "-50%",
      badgeType: "discount",
    },
    {
      name: "Respira",
      description: "Outdoor bar table",
      price: "₹5,000",
      oldPrice: "",
      image: product4,
      badge: "New",
      badgeType: "new",
    },
    {
      name: "Grifo",
      description: "Night lamp",
      price: "₹1,500",
      oldPrice: "",
      image: product1,
      badge: "",
      badgeType: "",
    },
    {
      name: "Muggo",
      description: "Small mug",
      price: "₹1,200",
      oldPrice: "",
      image: product2,
      badge: "New",
      badgeType: "new",
    },
    {
      name: "Pingky",
      description: "Cute bed set",
      price: "₹6,500",
      oldPrice: "₹8,000",
      image: product3,
      badge: "-20%",
      badgeType: "discount",
    },
    {
      name: "Potty",
      description: "Minimalist table",
      price: "₹4,000",
      oldPrice: "",
      image: product4,
      badge: "",
      badgeType: "",
    },
    {
      name: "Syltherine Plus",
      description: "Modern cafe chair",
      price: "₹3,200",
      oldPrice: "₹4,000",
      image: product1,
      badge: "-20%",
      badgeType: "discount",
    },
    {
      name: "Leviosa Plus",
      description: "Modern wooden chair",
      price: "₹3,000",
      oldPrice: "",
      image: product2,
      badge: "",
      badgeType: "",
    },
    {
      name: "Lolito Plus",
      description: "Premium sofa",
      price: "₹8,500",
      oldPrice: "₹10,000",
      image: product3,
      badge: "-15%",
      badgeType: "discount",
    },
    {
      name: "Respira Plus",
      description: "Modern outdoor table",
      price: "₹5,500",
      oldPrice: "",
      image: product4,
      badge: "New",
      badgeType: "new",
    },
    {
      name: "Grifo Plus",
      description: "Decorative lamp",
      price: "₹2,000",
      oldPrice: "",
      image: product1,
      badge: "",
      badgeType: "",
    },
    {
      name: "Muggo Plus",
      description: "Ceramic table set",
      price: "₹1,800",
      oldPrice: "",
      image: product2,
      badge: "New",
      badgeType: "new",
    },
    {
      name: "Pingky Plus",
      description: "Comfortable bed set",
      price: "₹7,500",
      oldPrice: "₹9,000",
      image: product3,
      badge: "-15%",
      badgeType: "discount",
    },
    {
      name: "Potty Plus",
      description: "Elegant side table",
      price: "₹4,500",
      oldPrice: "",
      image: product4,
      badge: "",
      badgeType: "",
    },
  ];

  /* =========================================================
     FILTER PRODUCTS BY SEARCH
  ========================================================= */

  const filteredProducts = products.filter((product) => {
    const search = searchQuery.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  });

  /* =========================================================
     CART
  ========================================================= */

  const [cartMessage, setCartMessage] = useState("");

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
        quantity:
          updatedCart[existingProductIndex].quantity + 1,
      };
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.name,
          name: product.name,
          description: product.description,
          price: Number(
            product.price.replace("₹", "").replace(",", "")
          ),
          image: product.image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "lunanest-cart",
      JSON.stringify(updatedCart)
    );

    setCartMessage(
      product.name + " added to cart!"
    );

    setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  /* =========================================================
     PAGINATION
  ========================================================= */

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  /* Reset page when search changes */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="shop-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          SHOP HERO
      ===================================================== */}

      <section
        className="shop-hero"
        style={{
          backgroundImage: `url(${shopBackground})`,
        }}
      >
        <div className="shop-hero-content">

          <h1>Shop</h1>

          <p>
            <Link to="/">
              Home
            </Link>

            <span className="breadcrumb-arrow">
              ›
            </span>

            <strong>Shop</strong>
          </p>

        </div>
      </section>

      {/* =====================================================
          SEARCH RESULT MESSAGE
      ===================================================== */}

      {searchQuery && (
        <div className="shop-search-result">
          <p>
            Search results for:
            <strong> "{searchQuery}"</strong>
          </p>
        </div>
      )}

      {/* =====================================================
          SHOP TOOLBAR
      ===================================================== */}

      <section className="shop-toolbar">

        <div className="toolbar-left">

          <button
            className="filter-button"
            type="button"
          >
            <span className="filter-icon">
              ☰
            </span>

            Filter
          </button>

          <span className="toolbar-divider"></span>

          <p>
            Showing{" "}
            {filteredProducts.length === 0
              ? 0
              : startIndex + 1}
            –
            {Math.min(
              startIndex + productsPerPage,
              filteredProducts.length
            )}{" "}
            of {filteredProducts.length} results
          </p>

        </div>

        <div className="toolbar-right">

          <label>
            Show

            <select defaultValue="8">

              <option value="8">
                8
              </option>

              <option value="12">
                12
              </option>

              <option value="16">
                16
              </option>

              <option value="24">
                24
              </option>

            </select>

          </label>

          <label>
            Sort by

            <select defaultValue="default">

              <option value="default">
                Default
              </option>

              <option value="name">
                Name
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

            </select>

          </label>

        </div>

      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="shop-products">

        <div className="shop-product-grid">

          {currentProducts.length === 0 ? (

            <div className="no-search-results">

              <h2>
                No products found
              </h2>

              <p>
                We couldn't find any furniture
                matching "{searchQuery}".
              </p>

            </div>

          ) : (

            currentProducts.map((product, index) => (

              <div
                className="shop-product-card"
                key={`${product.name}-${index}`}
              >

                {/* PRODUCT IMAGE */}

                <div className="shop-product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  {/* BADGE */}

                  {product.badge && (
                    <span
                      className={`product-badge ${product.badgeType}`}
                    >
                      {product.badge}
                    </span>
                  )}

                </div>

                {/* PRODUCT INFORMATION */}

                <div className="shop-product-info">

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <div className="shop-product-price">

                    <span>
                      {product.price}
                    </span>

                    {product.oldPrice && (
                      <del>
                        {product.oldPrice}
                      </del>
                    )}

                  </div>

                  <button
                    className="shop-add-cart-button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    Add to cart
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {/* CART MESSAGE */}

        {cartMessage && (
          <div className="cart-message">
            {cartMessage}
          </div>
        )}

        {/* ===================================================
            PAGINATION
        =================================================== */}

        {totalPages > 1 && (
          <div className="shop-pagination">

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  goToPage(page)
                }
              >
                {page}
              </button>

            ))}

            <button
              className="next-page"
              onClick={goToNextPage}
              disabled={
                currentPage === totalPages
              }
            >
              Next
            </button>

          </div>
        )}

      </section>

      {/* =====================================================
          BENEFITS STRIP
      ===================================================== */}

      <section className="shop-benefits">

        {/* HIGH QUALITY */}

        <div className="benefit-item">

          <div className="benefit-icon">
            🏆
          </div>

          <div className="benefit-text">

            <h3>
              High Quality
            </h3>

            <p>
              Crafted from top materials
            </p>

          </div>

        </div>

        {/* WARRANTY */}

        <div className="benefit-item">

          <div className="benefit-icon">
            🛡️
          </div>

          <div className="benefit-text">

            <h3>
              Warranty Protection
            </h3>

            <p>
              Over 2 years
            </p>

          </div>

        </div>

        {/* FREE SHIPPING */}

        <div className="benefit-item">

          <div className="benefit-icon">
            🚚
          </div>

          <div className="benefit-text">

            <h3>
              Free Shipping
            </h3>

            <p>
              Order over ₹5,000
            </p>

          </div>

        </div>

        {/* SUPPORT */}

        <div className="benefit-item">

          <div className="benefit-icon">
            ☎️
          </div>

          <div className="benefit-text">

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

      <footer className="shop-footer">

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">

            <h2>
              LunaNest
            </h2>

            <p>
              Furniture that helps you create
              your dream home.
            </p>

            <p className="footer-address">
              Beasant Technologies Pvt. Ltd.
              <br />
              Tambaram, Chennai, TamilNadu, India
            </p>

          </div>

          {/* LINKS */}

          <div className="footer-column">

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

          <div className="footer-column">

            <h3>
              Help
            </h3>

            <a href="#">
              Payment Options
            </a>

            <a href="#">
              Returns
            </a>

            <a href="#">
              Privacy Policies
            </a>

            <a href="#">
              Terms & Conditions
            </a>

          </div>

          {/* NEWSLETTER */}

          <div className="footer-newsletter">

            <h3>
              Newsletter
            </h3>

            <div className="newsletter-form">

              <input
                type="email"
                placeholder="Enter your email"
              />

              <button type="button">
                SUBSCRIBE
              </button>

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}

        <div className="footer-bottom">

          <p>
            © 2026 LunaNest. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Shop;