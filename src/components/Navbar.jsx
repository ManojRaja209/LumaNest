import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState(null);

  /* =========================================================
     SEARCH
  ========================================================= */

  const [searchText, setSearchText] = useState("");

  /* =========================================================
     WISHLIST
  ========================================================= */

  const [wishlist, setWishlist] = useState([]);

  /* =========================================================
     USER LOGIN
  ========================================================= */

  const [currentUser, setCurrentUser] = useState(null);

  const [authMode, setAuthMode] = useState("login");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [authMessage, setAuthMessage] = useState("");

  /* =========================================================
     LOAD USER + WISHLIST
  ========================================================= */

  useEffect(() => {
    const savedUser =
      JSON.parse(
        localStorage.getItem("lunanest-current-user")
      );

    if (savedUser) {
      setCurrentUser(savedUser);
    }

    const savedWishlist =
      JSON.parse(
        localStorage.getItem("lunanest-wishlist")
      ) || [];

    setWishlist(savedWishlist);

    const updateWishlist = () => {
      const updatedWishlist =
        JSON.parse(
          localStorage.getItem("lunanest-wishlist")
        ) || [];

      setWishlist(updatedWishlist);
    };

    window.addEventListener(
      "wishlistUpdated",
      updateWishlist
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        updateWishlist
      );
    };
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchText.trim();

    if (!query) {
      return;
    }

    setActivePanel(null);

    navigate(
      "/shop?search=" +
        encodeURIComponent(query)
    );
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = (event) => {
    event.preventDefault();

    setAuthMessage("");

    const savedUser =
      JSON.parse(
        localStorage.getItem("lunanest-user")
      );

    if (!savedUser) {
      setAuthMessage(
        "No account found. Please register first."
      );
      return;
    }

    if (
      loginData.email !== savedUser.email ||
      loginData.password !== savedUser.password
    ) {
      setAuthMessage(
        "Invalid email or password."
      );
      return;
    }

    localStorage.setItem(
      "lunanest-current-user",
      JSON.stringify({
        name: savedUser.name,
        email: savedUser.email,
      })
    );

    setCurrentUser({
      name: savedUser.name,
      email: savedUser.email,
    });

    setLoginData({
      email: "",
      password: "",
    });

    setAuthMessage("");

    alert(
      `Welcome back, ${savedUser.name}!`
    );

    setActivePanel(null);
  };

  /* =========================================================
     REGISTER
  ========================================================= */

  const handleRegister = (event) => {
    event.preventDefault();

    setAuthMessage("");

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setAuthMessage(
        "Please fill in all fields."
      );
      return;
    }

    if (
      registerData.password !==
      registerData.confirmPassword
    ) {
      setAuthMessage(
        "Passwords do not match."
      );
      return;
    }

    if (registerData.password.length < 6) {
      setAuthMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    const existingUser =
      JSON.parse(
        localStorage.getItem("lunanest-user")
      );

    if (
      existingUser &&
      existingUser.email === registerData.email
    ) {
      setAuthMessage(
        "An account with this email already exists."
      );
      return;
    }

    const newUser = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    };

    localStorage.setItem(
      "lunanest-user",
      JSON.stringify(newUser)
    );

    localStorage.setItem(
      "lunanest-current-user",
      JSON.stringify({
        name: newUser.name,
        email: newUser.email,
      })
    );

    setCurrentUser({
      name: newUser.name,
      email: newUser.email,
    });

    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    alert(
      "Registration successful!"
    );

    setActivePanel(null);
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "lunanest-current-user"
    );

    setCurrentUser(null);
    setActivePanel(null);

    alert("You have been logged out.");
  };

  /* =========================================================
     WISHLIST
  ========================================================= */

  const removeFromWishlist = (productName) => {
    const updatedWishlist =
      wishlist.filter(
        (item) => item.name !== productName
      );

    localStorage.setItem(
      "lunanest-wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(
        localStorage.getItem("lunanest-cart")
      ) || [];

    const existingProductIndex =
      existingCart.findIndex(
        (item) =>
          item.name === product.name
      );

    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = [...existingCart];

      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity:
          updatedCart[existingProductIndex]
            .quantity + 1,
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

    alert(
      `${product.name} added to cart!`
    );
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
          aria-label="Lunanest Home"
        >
          <span className="logo-symbol">
            △
          </span>

          <span className="logo-text">
            Lunanest
          </span>
        </Link>

        {/* NAVIGATION */}

        <nav className="nav-links">

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

        </nav>

        {/* NAV ICONS */}

        <div className="nav-icons">

          {/* ACCOUNT */}

          <button
            className="icon-button"
            onClick={() => {
              setAuthMessage("");

              if (currentUser) {
                setActivePanel("account");
              } else {
                setAuthMode("login");
                setActivePanel("account");
              }
            }}
            aria-label="Account"
          >
            <svg
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="7"
                r="4"
              />

              <path
                d="M4 21c0-4 3.5-6 8-6s8 2 8 6"
              />
            </svg>
          </button>

          {/* SEARCH */}

          <button
            className="icon-button"
            onClick={() =>
              setActivePanel("search")
            }
            aria-label="Search"
          >
            <svg
              viewBox="0 0 24 24"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <line
                x1="16.5"
                y1="16.5"
                x2="22"
                y2="22"
              />
            </svg>
          </button>

          {/* WISHLIST */}

          <button
            className="icon-button"
            onClick={() =>
              setActivePanel("wishlist")
            }
            aria-label="Wishlist"
          >
            <svg
              viewBox="0 0 24 24"
            >
              <path
                d="M20.8 8.8c0 5.3-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.8C3.2 5.9 5.3 4 8 4c1.7 0 3.2.8 4 2.2C12.8 4.8 14.3 4 16 4c2.7 0 4.8 1.9 4.8 4.8Z"
              />
            </svg>

            {wishlist.length > 0 && (
              <span className="wishlist-count">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* CART */}

          <Link
            to="/cart"
            className="icon-button"
            aria-label="Shopping cart"
          >
            <svg
              viewBox="0 0 24 24"
            >
              <path
                d="M3 4h2l2 11h10l3-8H6"
              />

              <circle
                cx="9"
                cy="20"
                r="1.5"
              />

              <circle
                cx="17"
                cy="20"
                r="1.5"
              />
            </svg>
          </Link>

        </div>
      </header>

      {/* =====================================================
          POPUP
      ===================================================== */}

      {activePanel && (

        <div
          className="overlay"
          onClick={() =>
            setActivePanel(null)
          }
        >

          <div
            className="panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              className="close-button"
              onClick={() =>
                setActivePanel(null)
              }
              aria-label="Close"
            >
              ×
            </button>

            {/* =================================================
                ACCOUNT
            ================================================= */}

            {activePanel === "account" && (

              <>

                {!currentUser ? (

                  <>

                    {authMode === "login" ? (

                      <>

                        <h2>
                          Login
                        </h2>

                        <p className="auth-subtitle">
                          Welcome back to LunaNest
                        </p>

                        <form
                          className="auth-form"
                          onSubmit={handleLogin}
                        >

                          <input
                            type="email"
                            placeholder="Email address"
                            value={
                              loginData.email
                            }
                            onChange={(event) =>
                              setLoginData({
                                ...loginData,
                                email:
                                  event.target.value,
                              })
                            }
                            required
                          />

                          <input
                            type="password"
                            placeholder="Password"
                            value={
                              loginData.password
                            }
                            onChange={(event) =>
                              setLoginData({
                                ...loginData,
                                password:
                                  event.target.value,
                              })
                            }
                            required
                          />

                          {authMessage && (
                            <p className="auth-error">
                              {authMessage}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="panel-button"
                          >
                            Login
                          </button>

                        </form>

                        <p className="auth-switch">

                          Don't have an account?

                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode(
                                "register"
                              );
                              setAuthMessage("");
                            }}
                          >
                            Register
                          </button>

                        </p>

                      </>

                    ) : (

                      <>

                        <h2>
                          Create Account
                        </h2>

                        <p className="auth-subtitle">
                          Join LunaNest today
                        </p>

                        <form
                          className="auth-form"
                          onSubmit={
                            handleRegister
                          }
                        >

                          <input
                            type="text"
                            placeholder="Full name"
                            value={
                              registerData.name
                            }
                            onChange={(event) =>
                              setRegisterData({
                                ...registerData,
                                name:
                                  event.target.value,
                              })
                            }
                            required
                          />

                          <input
                            type="email"
                            placeholder="Email address"
                            value={
                              registerData.email
                            }
                            onChange={(event) =>
                              setRegisterData({
                                ...registerData,
                                email:
                                  event.target.value,
                              })
                            }
                            required
                          />

                          <input
                            type="password"
                            placeholder="Password"
                            value={
                              registerData.password
                            }
                            onChange={(event) =>
                              setRegisterData({
                                ...registerData,
                                password:
                                  event.target.value,
                              })
                            }
                            required
                          />

                          <input
                            type="password"
                            placeholder="Confirm password"
                            value={
                              registerData.confirmPassword
                            }
                            onChange={(event) =>
                              setRegisterData({
                                ...registerData,
                                confirmPassword:
                                  event.target.value,
                              })
                            }
                            required
                          />

                          {authMessage && (
                            <p className="auth-error">
                              {authMessage}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="panel-button"
                          >
                            Register
                          </button>

                        </form>

                        <p className="auth-switch">

                          Already have an account?

                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode(
                                "login"
                              );
                              setAuthMessage("");
                            }}
                          >
                            Login
                          </button>

                        </p>

                      </>

                    )}

                  </>

                ) : (

                  <div className="account-logged-in">

                    <h2>
                      My Account
                    </h2>

                    <div className="account-user-icon">
                      <svg
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                        />

                        <path
                          d="M4 21c0-4 3.5-6 8-6s8 2 8 6"
                        />
                      </svg>
                    </div>

                    <h3>
                      {currentUser.name}
                    </h3>

                    <p>
                      {currentUser.email}
                    </p>

                    <button
                      className="panel-button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </div>

                )}

              </>

            )}

            {/* =================================================
                SEARCH
            ================================================= */}

            {activePanel === "search" && (

              <>

                <h2>
                  Search Products
                </h2>

                <form
                  onSubmit={handleSearch}
                >

                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={(event) =>
                      setSearchText(
                        event.target.value
                      )
                    }
                    autoFocus
                  />

                  <button
                    type="submit"
                    className="panel-button"
                  >
                    Search
                  </button>

                </form>

              </>

            )}

            {/* =================================================
                WISHLIST
            ================================================= */}

            {activePanel === "wishlist" && (

              <>

                <h2>
                  Wishlist
                </h2>

                {wishlist.length === 0 ? (

                  <p>
                    Your wishlist is currently empty.
                  </p>

                ) : (

                  <div className="wishlist-panel">

                    {wishlist.map(
                      (product, index) => (

                        <div
                          className="wishlist-item"
                          key={`${product.name}-${index}`}
                        >

                          <img
                            src={product.image}
                            alt={product.name}
                            className="wishlist-item-image"
                          />

                          <div className="wishlist-item-details">

                            <h3>
                              {product.name}
                            </h3>

                            <p>
                              {product.price}
                            </p>

                            <button
                              className="wishlist-cart-button"
                              onClick={() =>
                                addToCart(product)
                              }
                            >
                              Add to Cart
                            </button>

                          </div>

                          <button
                            className="wishlist-remove-button"
                            onClick={() =>
                              removeFromWishlist(
                                product.name
                              )
                            }
                            aria-label="Remove from wishlist"
                          >
                            ×
                          </button>

                        </div>

                      )
                    )}

                  </div>

                )}

              </>

            )}

          </div>

        </div>

      )}

    </>
  );
}

export default Navbar;