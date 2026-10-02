import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import shopBackground from "../assets/imageshop/shop-background.png";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import product4 from "../assets/images/product-4.png";

import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />


      {/* =====================================================
          ABOUT HERO
      ===================================================== */}

      <section
        className="about-hero"
        style={{
          backgroundImage: `url(${shopBackground})`,
        }}
      >

        <div className="about-hero-overlay">

          <div className="about-hero-content">

            <div className="about-logo">
              LunaNest.
            </div>

            <h1>
              About Us
            </h1>

            <div className="about-breadcrumb">

              <Link to="/">
                Home
              </Link>

              <span>
                ›
              </span>

              <strong>
                About
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section className="about-story">

        <div className="about-story-image">

          <img
            src={product1}
            alt="LunaNest furniture"
          />

        </div>


        <div className="about-story-content">

          <span className="about-small-title">
            OUR STORY
          </span>

          <h2>
            Creating beautiful spaces,
            one piece at a time.
          </h2>

          <p>
            At LunaNest, we believe that furniture is
            more than something you place inside your
            home. It is part of the way you live,
            relax, work and create memories.
          </p>

          <p>
            Our journey began with a simple idea:
            create furniture that combines comfort,
            functionality and timeless design.
            Every collection is carefully selected
            to help you create a home that feels
            personal and welcoming.
          </p>

          <Link
            to="/shop"
            className="about-primary-button"
          >
            Explore Our Collection
          </Link>

        </div>

      </section>


      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section className="about-who">

        <div className="about-who-content">

          <span className="about-small-title">
            WHO WE ARE
          </span>

          <h2>
            Furniture designed
            around your lifestyle.
          </h2>

          <p>
            LunaNest is a modern furniture destination
            focused on bringing elegant and practical
            pieces into everyday homes.
          </p>

          <p>
            From comfortable chairs and beautiful
            sofas to tables and decorative pieces,
            we carefully consider design, materials
            and usability.
          </p>

          <div className="about-check-list">

            <div>
              <span>✓</span>
              Quality materials
            </div>

            <div>
              <span>✓</span>
              Thoughtful designs
            </div>

            <div>
              <span>✓</span>
              Comfortable living
            </div>

            <div>
              <span>✓</span>
              Customer-focused service
            </div>

          </div>

        </div>


        <div className="about-who-image">

          <img
            src={product2}
            alt="Modern furniture"
          />

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="about-why">

        <div className="about-section-heading">

          <span className="about-small-title">
            WHY LUNANEST
          </span>

          <h2>
            Designed for the way you live.
          </h2>

          <p>
            We focus on the details that make
            furniture beautiful, useful and
            comfortable.
          </p>

        </div>


        <div className="about-feature-grid">

          <div className="about-feature-card">

            <div className="about-feature-icon">
              ✦
            </div>

            <h3>
              Timeless Design
            </h3>

            <p>
              Clean shapes and carefully selected
              styles that work beautifully across
              different interiors.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              ♢
            </div>

            <h3>
              Quality Materials
            </h3>

            <p>
              We value materials that provide
              durability, comfort and a refined
              appearance.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              ⌂
            </div>

            <h3>
              Made for Home
            </h3>

            <p>
              Our furniture is selected with
              everyday living and comfort in mind.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              ♡
            </div>

            <h3>
              Customer Care
            </h3>

            <p>
              We want every part of your LunaNest
              experience to feel simple and reliable.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION & VISION
      ===================================================== */}

      <section className="about-mission">

        <div className="about-mission-image">

          <img
            src={product3}
            alt="LunaNest interior"
          />

        </div>


        <div className="about-mission-content">

          <div className="about-mission-block">

            <span className="about-small-title">
              OUR MISSION
            </span>

            <h2>
              Make beautiful furniture
              accessible to everyone.
            </h2>

            <p>
              Our mission is to make it easier for
              people to create comfortable and
              beautiful spaces without compromising
              on quality or style.
            </p>

          </div>


          <div className="about-mission-divider"></div>


          <div className="about-mission-block">

            <span className="about-small-title">
              OUR VISION
            </span>

            <h2>
              Help every home feel
              uniquely yours.
            </h2>

            <p>
              We imagine a world where furniture
              reflects the personality, comfort and
              lifestyle of the people who use it.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="about-stats">

        <div className="about-stat">

          <strong>
            10+
          </strong>

          <span>
            Years of Experience
          </span>

        </div>


        <div className="about-stat">

          <strong>
            50K+
          </strong>

          <span>
            Happy Customers
          </span>

        </div>


        <div className="about-stat">

          <strong>
            100+
          </strong>

          <span>
            Furniture Designs
          </span>

        </div>


        <div className="about-stat">

          <strong>
            24/7
          </strong>

          <span>
            Customer Support
          </span>

        </div>

      </section>


      {/* =====================================================
          COLLECTION PREVIEW
      ===================================================== */}

      <section className="about-collection">

        <div className="about-section-heading">

          <span className="about-small-title">
            OUR COLLECTION
          </span>

          <h2>
            Pieces made for your space.
          </h2>

          <p>
            Explore some of the furniture styles
            that define LunaNest.
          </p>

        </div>


        <div className="about-collection-grid">

          <div className="about-collection-card">

            <img
              src={product1}
              alt="Chair"
            />

            <div>
              <h3>
                Comfortable Chairs
              </h3>

              <p>
                Designed for everyday comfort.
              </p>
            </div>

          </div>


          <div className="about-collection-card">

            <img
              src={product2}
              alt="Modern chair"
            />

            <div>
              <h3>
                Modern Seating
              </h3>

              <p>
                Simple forms with elegant details.
              </p>
            </div>

          </div>


          <div className="about-collection-card">

            <img
              src={product3}
              alt="Sofa"
            />

            <div>
              <h3>
                Luxury Sofas
              </h3>

              <p>
                Create a welcoming living room.
              </p>

            </div>

          </div>


          <div className="about-collection-card">

            <img
              src={product4}
              alt="Table"
            />

            <div>
              <h3>
                Functional Tables
              </h3>

              <p>
                Practical pieces for modern homes.
              </p>
            </div>

          </div>

        </div>


        <Link
          to="/shop"
          className="about-secondary-button"
        >
          View All Products
        </Link>

      </section>


      {/* =====================================================
          BENEFITS STRIP
      ===================================================== */}

      <section className="about-benefits">

        <div className="about-benefit">

          <div className="about-benefit-icon">
            🏆
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


        <div className="about-benefit">

          <div className="about-benefit-icon">
            🛡️
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


        <div className="about-benefit">

          <div className="about-benefit-icon">
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


        <div className="about-benefit">

          <div className="about-benefit-icon">
            ☎️
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

      <footer className="about-footer">

        <div className="about-footer-main">

          {/* BRAND */}

          <div className="about-footer-brand">

            <h2>
              LunaNest
            </h2>

            <p>
              Furniture that helps you create
              your dream home.
            </p>

            <p className="about-footer-address">
              Beasant Technologies Pvt. Ltd.
              <br />
              Chennai, TamilNadu, India
            </p>

          </div>


          {/* LINKS */}

          <div className="about-footer-column">

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

          <div className="about-footer-column">

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

          <div className="about-footer-newsletter">

            <h3>
              Newsletter
            </h3>

            <div className="about-newsletter-form">

              <input
                type="email"
                placeholder="Enter your email"
              />

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Thank you for subscribing!"
                  )
                }
              >
                SUBSCRIBE
              </button>

            </div>

          </div>

        </div>


        <div className="about-footer-bottom">

          <p>
            © 2026 LunaNest. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default About;