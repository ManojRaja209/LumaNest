import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import shopBackground from "../assets/imageshop/shop-background.png";

import "./Contact.css";


/* =========================================================
   GOOGLE SHEETS WEB APP URL
========================================================= */

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw4NaKtuUsPsXMlDKTs2hbtTlGitXlRaeBBjFVki4D7i-DcXprhlAGK3uhMx1CryjaPtg/exec";


function Contact() {

  /* =======================================================
    CONTACT FORM
  ======================================================= */

  const handleSubmit = async (event) => {

    event.preventDefault();

    const form = event.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();


    /* -------------------------------------------------------
       BASIC VALIDATION
    ------------------------------------------------------- */

    if (!name || !email || !message) {

      alert(
        "Please fill in your name, email address and message."
      );

      return;
    }


    /* -------------------------------------------------------
       EMAIL VALIDATION
    ------------------------------------------------------- */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      alert("Please enter a valid email address.");

      return;
    }


    /* -------------------------------------------------------
       CHECK GOOGLE SCRIPT URL
    ------------------------------------------------------- */

    if (
      GOOGLE_SHEET_URL ===
      "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
    ) {

      alert(
        "Google Sheets is not connected yet. Please add your Apps Script URL."
      );

      return;
    }


    /* -------------------------------------------------------
       LOADING STATE
    ------------------------------------------------------- */

    const submitButton =
      form.querySelector(".contact-submit-button");

    submitButton.disabled = true;

    submitButton.textContent = "Sending...";


    /* -------------------------------------------------------
       SEND DATA TO GOOGLE SHEETS
    ------------------------------------------------------- */

    try {

      await fetch(GOOGLE_SHEET_URL, {

        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },

        body: JSON.stringify({
  type: "contact",
  name: name,
  email: email,
  subject: subject,
  message: message,
}),

      });


      /* -----------------------------------------------------
         SUCCESS
      ----------------------------------------------------- */

      alert(
        "Thank you! Your message has been sent successfully."
      );

      form.reset();


    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );

    } finally {

      submitButton.disabled = false;

      submitButton.textContent = "Submit";

    }

  };


  /* =======================================================
     NEWSLETTER
  ======================================================= */

  const handleNewsletter = (event) => {

    event.preventDefault();

    const form = event.target;

    const email =
      form.newsletterEmail.value.trim();


    if (!email) {

      alert("Please enter your email address.");

      return;
    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

      alert("Please enter a valid email address.");

      return;
    }


    alert(
      "Thank you for subscribing to LunaNest!"
    );

    form.reset();

  };


  return (

    <div className="contact-page">


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="contact-hero"
        style={{
          backgroundImage:
            `url(${shopBackground})`,
        }}
      >

        <div className="contact-hero-overlay">

          <div className="contact-hero-content">

            <div className="contact-hero-logo">
              LunaNest.
            </div>

            <h1>
              Contact
            </h1>

            <div className="contact-breadcrumb">

              <Link to="/">
                Home
              </Link>

              <span>
                ›
              </span>

              <strong>
                Contact
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="contact-section">

        <div className="contact-heading">

          <h2>
            Get In Touch With Us
          </h2>

          <p>
            For more information about our products and
            services, please feel free to contact us.
            Our friendly team is always ready to help you.
          </p>

        </div>


        <div className="contact-content">


          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="contact-information">


            {/* ADDRESS */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <span>⌖</span>
              </div>

              <div className="contact-info-text">

                <h3>
                  Address
                </h3>

                <p>
                  Tambaram
                  <br />
                  Chennai, TamilNadu
                  <br />
                  India
                </p>

              </div>

            </div>


            {/* PHONE */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <span>☎</span>
              </div>

              <div className="contact-info-text">

                <h3>
                  Phone
                </h3>

                <p>
                  Mobile: 9952678582
                  <br />
                  Hotline: nothing
                </p>

              </div>

            </div>


            {/* WORKING TIME */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <span>◷</span>
              </div>

              <div className="contact-info-text">

                <h3>
                  Working Time
                </h3>

                <p>
                  Monday-Friday: 9:00 - 22:00
                  <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="contact-form-group">

              <label htmlFor="contact-name">
                Your name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Abc"
                autoComplete="name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="contact-form-group">

              <label htmlFor="contact-email">
                Email address
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Abc@def.com"
                autoComplete="email"
                required
              />

            </div>


            {/* SUBJECT */}

            <div className="contact-form-group">

              <label htmlFor="contact-subject">
                Subject
              </label>

              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="This is an optional"
              />

            </div>


            {/* MESSAGE */}

            <div className="contact-form-group">

              <label htmlFor="contact-message">
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                placeholder="Hi! I'd like to ask about..."
                rows="5"
                required
              ></textarea>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="contact-submit-button"
            >
              Submit
            </button>

          </form>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="contact-benefits">


        <div className="contact-benefit">

          <div className="contact-benefit-icon">
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


        <div className="contact-benefit">

          <div className="contact-benefit-icon">
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


        <div className="contact-benefit">

          <div className="contact-benefit-icon">
            🚚
          </div>

          <div>

            <h3>
              Free Shipping
            </h3>

            <p>
              Order over $150
            </p>

          </div>

        </div>


        <div className="contact-benefit">

          <div className="contact-benefit-icon">
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

      <footer className="contact-footer">

        <div className="contact-footer-main">


          {/* BRAND */}

          <div className="contact-footer-brand">

            <h2>
              LunaNest
            </h2>

            <p>
              Furniture that helps you create
              your dream home.
            </p>

            <p className="contact-footer-address">

              Beasant Technologies
              <br />

              Tambaram, Chennai, TamilNadu 

            </p>

          </div>


          {/* LINKS */}

          <div className="contact-footer-column">

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

          <div className="contact-footer-column">

            <h3>
              Help
            </h3>

            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Payment Options
            </a>

            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Returns
            </a>

            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Privacy Policies
            </a>

            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Terms & Conditions
            </a>

          </div>


          {/* NEWSLETTER */}

          <div className="contact-footer-newsletter">

            <h3>
              Newsletter
            </h3>

            <form
              className="contact-newsletter-form"
              onSubmit={handleNewsletter}
            >

              <input
                name="newsletterEmail"
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

        <div className="contact-footer-bottom">

          <p>
            © 2026 LunaNest. All rights reserved.
          </p>

        </div>

      </footer>

    </div>

  );
}

export default Contact;