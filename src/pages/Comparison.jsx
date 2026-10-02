import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import product4 from "../assets/images/product-4.png";

import "./Comparison.css";

function Comparison() {
  const location = useLocation();

  const products = [
    {
      name: "Syltherine",
      price: 2500,
      image: product1,
      rating: 4.5,
      reviews: 12,
      description: "Stylish and comfortable furniture for modern homes.",
      color: "Golden Brown",
      material: "Solid Wood",
      dimensions: "45 x 45 x 75 cm",
      warranty: "1 Year",
    },
    {
      name: "Leviosa",
      price: 2500,
      image: product2,
      rating: 4.2,
      reviews: 10,
      description: "Elegant furniture designed for everyday comfort.",
      color: "Black",
      material: "Solid Wood",
      dimensions: "48 x 48 x 76 cm",
      warranty: "1 Year",
    },
    {
      name: "Lolito",
      price: 7000,
      image: product3,
      rating: 4.8,
      reviews: 18,
      description: "Premium furniture with a luxurious modern finish.",
      color: "Light Brown",
      material: "Engineered Wood",
      dimensions: "50 x 50 x 80 cm",
      warranty: "2 Years",
    },
    {
      name: "Respira",
      price: 5000,
      image: product4,
      rating: 4.6,
      reviews: 15,
      description: "Natural design combined with excellent comfort.",
      color: "Natural Green",
      material: "Natural Wood",
      dimensions: "46 x 46 x 78 cm",
      warranty: "2 Years",
    },
  ];

  const selectedProduct = location.state
    ? location.state.selectedProduct
    : null;

  let firstProduct = products[0];

  if (selectedProduct) {
    const foundProduct = products.find(
      (product) => product.name === selectedProduct.name
    );

    if (foundProduct) {
      firstProduct = foundProduct;
    }
  }

  const getSecondProduct = () => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].name !== firstProduct.name) {
        return products[i].name;
      }
    }

    return products[0].name;
  };

  const [secondProductName, setSecondProductName] = useState(
    getSecondProduct()
  );

  const secondProduct =
    products.find(
      (product) => product.name === secondProductName
    ) || products[1];

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
          name: product.name,
          price: product.price,
          image: product.image,
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

  const formatPrice = (price) => {
    return "₹" + price.toLocaleString("en-IN");
  };

  return (
    <div className="comparison-page">
      <Navbar />

      <section className="comparison-hero">
        <div className="comparison-hero-content">
          <h1>Product Comparison</h1>

          <p>
            <Link to="/">Home</Link>
            <span> &gt; </span>
            Comparison
          </p>
        </div>
      </section>

      <main className="comparison-container">

        <div className="comparison-top">

          <div className="comparison-intro">
            <h2>
              Go to Product
              <br />
              page for more
              <br />
              Products
            </h2>

            <Link to="/shop" className="comparison-view-more">
              View More
            </Link>
          </div>

          <div className="comparison-product-card">
            <div className="comparison-image-box">
              <img
                src={firstProduct.image}
                alt={firstProduct.name}
              />
            </div>

            <h3>{firstProduct.name}</h3>

            <p className="comparison-price">
              {formatPrice(firstProduct.price)}
            </p>

            <div className="comparison-rating">
              <strong>{firstProduct.rating}</strong>
              <span>★★★★★</span>
            </div>

            <p className="comparison-reviews">
              {firstProduct.reviews} Customer Reviews
            </p>
          </div>

          <div className="comparison-product-card">
            <div className="comparison-image-box">
              <img
                src={secondProduct.image}
                alt={secondProduct.name}
              />
            </div>

            <h3>{secondProduct.name}</h3>

            <p className="comparison-price">
              {formatPrice(secondProduct.price)}
            </p>

            <div className="comparison-rating">
              <strong>{secondProduct.rating}</strong>
              <span>★★★★★</span>
            </div>

            <p className="comparison-reviews">
              {secondProduct.reviews} Customer Reviews
            </p>
          </div>

          <div className="comparison-add-product">
            <h3>Add A Product</h3>

            <select
              value={secondProductName}
              onChange={(event) =>
                setSecondProductName(event.target.value)
              }
            >
              {products.map((product) => (
                <option
                  key={product.name}
                  value={product.name}
                  disabled={product.name === firstProduct.name}
                >
                  {product.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="comparison-section">

          <div className="comparison-section-title">
            <h2>General</h2>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">
              General
            </div>

            <div>
              {firstProduct.description}
            </div>

            <div>
              {secondProduct.description}
            </div>

            <div></div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">
              Material
            </div>

            <div>{firstProduct.material}</div>

            <div>{secondProduct.material}</div>

            <div></div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">
              Color
            </div>

            <div>{firstProduct.color}</div>

            <div>{secondProduct.color}</div>

            <div></div>
          </div>

        </div>

        <div className="comparison-section">

          <div className="comparison-section-title">
            <h2>Product</h2>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">
              Product Name
            </div>

            <div>{firstProduct.name}</div>

            <div>{secondProduct.name}</div>

            <div></div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">
              Price
            </div>

            <div>{formatPrice(firstProduct.price)}</div>

            <div>{formatPrice(secondProduct.price)}</div>

            <div></div>
          </div>

        </div>

        <div className="comparison-section">

          <div className="comparison-section-title">
            <h2>Dimensions</h2>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">
              Dimensions
            </div>

            <div>{firstProduct.dimensions}</div>

            <div>{secondProduct.dimensions}</div>

            <div></div>
          </div>

        </div>

        <div className="comparison-section">

          <div className="comparison-section-title">
            <h2>Warranty</h2>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">
              Warranty
            </div>

            <div>{firstProduct.warranty}</div>

            <div>{secondProduct.warranty}</div>

            <div></div>
          </div>

        </div>

        <div className="comparison-buttons">

          <div></div>

          <div>
            <button
              className="comparison-cart-button"
              onClick={() => addToCart(firstProduct)}
            >
              Add To Cart
            </button>
          </div>

          <div>
            <button
              className="comparison-cart-button"
              onClick={() => addToCart(secondProduct)}
            >
              Add To Cart
            </button>
          </div>

          <div></div>

        </div>

      </main>

      <section className="comparison-benefits">

        <div>
          <strong>High Quality</strong>
          <span>Crafted from top materials</span>
        </div>

        <div>
          <strong>Warranty Protection</strong>
          <span>Over 2 years</span>
        </div>

        <div>
          <strong>Free Shipping</strong>
          <span>Order over ₹5,000</span>
        </div>

        <div>
          <strong>24 / 7 Support</strong>
          <span>Dedicated support</span>
        </div>

      </section>

      <footer className="comparison-footer">
        <div>
          <h2>LunaNest</h2>
          <p>
            Luxury furniture for beautiful living spaces.
          </p>
        </div>

        <div>
          <h4>Links</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Help</h4>
          <p>Payment Options</p>
          <p>Returns</p>
          <p>Privacy Policies</p>
        </div>
      </footer>
    </div>
  );
}

export default Comparison;