/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from "react";
import "../styles/_product.scss";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import api from "../http/api";
import ImageZoom from "../components/imageZoom/ImageZoom";
import { addProductToCart } from "../redux/actions/cartActions";

function Products() {
  const dispatch = useDispatch();
  const { productNo } = useParams();
  const numericProductId = +productNo;
  const [productData, setProductData] = useState({});
  const [reviewData, setReviewData] = useState(null);
  const [currentSection, setCurrentSection] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const isProductInCart = cartProducts.some(
    (product) => product.product.itemNo === numericProductId
  );

  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [nameValidation, setNameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const token = useSelector((state) => state.token.accessToken);

  const formStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid #03141215",
    marginTop: "10px",
    marginBottom: "39px",
    "&:hover": {
      borderBottom: "1px solid #031412"
    }
  };

  const inputStyle = {
    width: "100%",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    color: "#031412",
    marginBottom: "10px"
  };

  const fetchProductData = useCallback(async () => {
    try {
      const response = await api.get(`/products/${productNo}`);

      if (response.status === 200) {
        const product = response.data;
        setProductData(product);
      } else {
        console.log("Произошла ошибка при получении данных о продукте.");
      }
    } catch (error) {
      console.error("Ошибка при получении данных о продукте:", error);
    }
  }, [productNo]);

  const fetchReviewData = useCallback(async () => {
    if (productData && productData._id) {
      try {
        const response = await api.get(`/comments/product/${productData._id}`);

        if (response.status === 200) {
          const review = response.data;
          setReviewData(review);
        } else {
          console.log("Произошла ошибка при получении данных о продукте.");
        }
      } catch (error) {
        console.error("Ошибка при получении данных о продукте:", error);
      }
    }
  }, [productData]);

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [fetchProductData]);

  useEffect(() => {
    fetchReviewData();
  }, [productData, fetchReviewData]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleAddToCart = (selectedProduct) => {
    console.log(selectedProduct);
    dispatch(addProductToCart(selectedProduct, 1, token));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/comments",
        {
          product: productData._id,
          content: reviewText,
          name: reviewerName,
          email: reviewerEmail
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      if (response.status === 200) {
        console.log("Данные успешно отправлены на сервер");

        await fetchReviewData();
      } else {
        console.log("Произошла ошибка при отправке данных на сервер.");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };

  const validateName = (name) => {
    if (name.length < 2 || name.length > 8) {
      setNameValidation("Name should be 2 to 8 characters");
      return false;
    }
    setNameValidation("");
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setEmailValidation("Invalid email format");
      return false;
    }
    setEmailValidation("");
    return true;
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewerNameChange = (e) => {
    const name = e.target.value;
    setReviewerName(name);
    console.log(name);
    validateName(name);
  };

  const handleReviewerEmailChange = (e) => {
    const email = e.target.value;
    setReviewerEmail(email);
    validateEmail(email);
  };

  return (
    <div className="product-container">
      <div className="product">
        <div className="product__image-container">
          {productData && productData.imageUrls && productData.imageUrls[0] ? (
            <ImageZoom src={productData.imageUrls[0]} />
          ) : (
            <div>Image not found</div>
          )}
        </div>
        <div className="product__info">
          <h1 className="product-title">
            {productData ? productData.name : "Loading..."}
          </h1>
          <div className="product-prices">
            {productData ? (
              <>
                {productData.previousPrice ? (
                  <del>$ {productData.previousPrice},00</del>
                ) : null}
                <span className="current-price">
                  $ {productData.currentPrice},00
                </span>
              </>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="product-rate">
            <span>Quantity:</span>
            {productData ? productData.quantity : "Loading..."}
          </div>
          <div className="product-description">
            {showFullDescription ? (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam placerat, augue a volutpat hendrerit, sapien tortor
                  faucibus augue, a maximus elit ex vitae libero. Sed quis
                  mauris eget arcu facilisis consequat sed eu felis.
                </p>
                <button
                  type="button"
                  className="more__desc"
                  onClick={() => setShowFullDescription(false)}
                >
                  Hide
                </button>
              </>
            ) : (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                placerat...
              </p>
            )}
          </div>
          {!showFullDescription && (
            <button
              className="more__desc"
              type="button"
              onClick={() => setShowFullDescription(true)}
            >
              View more
            </button>
          )}
          {isProductInCart ? (
            <div className="product-cart">
              <Link to="/cart">
                <Button className="add-to-cart__btn inCart">
                  Already In Cart
                </Button>
              </Link>
            </div>
          ) : (
            <div className="product-cart">
              {productData.quantity > 0 ? (
                <Button
                  onClick={() => handleAddToCart(productData)}
                  className="add-to-cart__btn"
                >
                  ADD TO CART
                </Button>
              ) : (
                <p className="out-of-stock-message">Out of Stock</p>
              )}
            </div>
          )}
          <div className="product-socials">
            <div className="straight" />
            <div className="socials-links">
              <a href="https://www.facebook.com/">
                <Icon fontSize={23} icon="ri:facebook-fill" color="#707070" />
              </a>
              <a href="https://www.instagram.com/">
                <Icon fontSize={23} icon="mdi:instagram" color="#707070" />
              </a>
              <a href="https://twitter.com/">
                <Icon fontSize={23} icon="mdi:twitter" color="#707070" />
              </a>
            </div>
          </div>
          <div className="product-categories">
            Categories:
            <span>
              {productData && productData.categories
                ? productData.categories
                : "Loading.."}
            </span>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="info-buttons">
          <button
            type="button"
            className={currentSection === "description" ? "active" : ""}
            onClick={() => handleSectionChange("description")}
          >
            Description
          </button>
          <button
            type="button"
            className={currentSection === "aditional-info" ? "active" : ""}
            onClick={() => handleSectionChange("aditional-info")}
          >
            Aditional information
          </button>
          <button
            type="button"
            className={currentSection === "reviews" ? "active" : ""}
            onClick={() => {
              handleSectionChange("reviews");
            }}
          >
            Reviews ({reviewData ? reviewData.length : 0})
          </button>
        </div>
        <div className="info-field">
          {currentSection === "description" && (
            <p>This is the description section.</p>
          )}
          {currentSection === "aditional-info" && (
            <p>This is the Aditional-info section.</p>
          )}
          {currentSection === "reviews" && (
            <div className="reviews-container">
              <div className="reviews">
                <h1 className="reviews-title">
                  {reviewData ? reviewData.length : 0} Reviews for{" "}
                  {productData ? productData.name : "Loading..."}
                </h1>
                {reviewData
                  ? reviewData.map((review) => (
                      <div className="review-wrapper" key={review._id}>
                        <h1>
                          {review.name}
                          <span>
                            {format(new Date(review.date), "d MMMM, yyyy")}
                          </span>
                        </h1>
                        <p>{review.content}</p>
                      </div>
                    ))
                  : "There are no reviews"}
              </div>
              {token ? (
                <div className="add-reviews">
                  <div className="add-reviews__title">
                    <h1>Add a Review</h1>
                    <span>
                      Your email address will not be published. Required fields
                      are marked *
                    </span>
                  </div>
                  <h2>Your Review*</h2>
                  <form onSubmit={handleFormSubmit}>
                    <Box sx={formStyle}>
                      <input
                        style={inputStyle}
                        type="text"
                        value={reviewText}
                        onChange={handleReviewTextChange}
                      />
                    </Box>
                    <Box
                      className="add-reviews__name"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        borderBottom: nameValidation
                          ? "1px solid red"
                          : "1px solid #03141215",
                        marginTop: "10px",
                        marginBottom: "39px",
                        "&:hover": {
                          borderBottom: nameValidation
                            ? "1px solid red"
                            : "1px solid #031412"
                        }
                      }}
                    >
                      <input
                        style={inputStyle}
                        type="text"
                        placeholder="Enter your name*"
                        value={reviewerName}
                        onChange={handleReviewerNameChange}
                      />
                      {nameValidation && (
                        <span className="error-message">*</span>
                      )}
                    </Box>
                    <Box
                      className="add-reviews__email"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        borderBottom: emailValidation
                          ? "1px solid red"
                          : "1px solid #03141215",
                        marginTop: "10px",
                        marginBottom: "39px",
                        "&:hover": {
                          borderBottom: emailValidation
                            ? "1px solid red"
                            : "1px solid #031412"
                        }
                      }}
                    >
                      <input
                        style={inputStyle}
                        type="text"
                        placeholder="Enter your Email*"
                        value={reviewerEmail}
                        onChange={handleReviewerEmailChange}
                      />
                      {emailValidation && (
                        <span className="error-message">*</span>
                      )}
                    </Box>
                    <Button type="submit" className="add-review__submit">
                      SUBMIT
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="reviews_login">
                  You need to <Link to="/myAccount/signIn">Login</Link> or
                  <Link to="myAccount/register"> Register</Link> to publish a
                  review.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Products;
