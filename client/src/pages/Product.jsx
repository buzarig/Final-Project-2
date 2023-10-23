/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import "../styles/_product.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import api from "../http/api";

import ImageZoom from "../components/imageZoom/ImageZoom";

import { addProductToCart } from "../redux/actions/cartActions";

function Products() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const numericProductId = +productId;
  const [productData, setProductData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCounter, setCartCounter] = useState(1);
  const [currentSection, setCurrentSection] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const isProductInCart = cartProducts.some(
    (product) => product.product.itemNo === numericProductId
  );

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await api.get(`/products/${productId}`);

        if (response.status === 200) {
          const product = response.data;
          setProductData(product);
        } else {
          console.log("Произошла ошибка при получении данных о продукте.");
        }
      } catch (error) {
        console.error("Ошибка при получении данных о продукте:", error);
      }
    }

    fetchProductData();
  }, [productId]);

  const incrementCounter = () => {
    if (cartCounter < productData.quantity) {
      setCartCounter(cartCounter + 1);
    }
  };

  const decrementCounter = () => {
    if (cartCounter > 1) {
      setCartCounter(cartCounter - 1);
    }
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleAddToCart = (selectedProduct) => {
    console.log(selectedProduct);
    dispatch(addProductToCart(selectedProduct, cartCounter));
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
            <span>Quantity:</span>{" "}
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
              <ButtonGroup className="cart-btn-group">
                <Button className="counter counter-btn">-</Button>
                <Box className="counter cart-counter">{cartCounter}</Box>
                <Button className="counter counter-btn">+</Button>
              </ButtonGroup>
              <Button className="add-to-cart__btn inCart">
                Already In Cart
              </Button>
            </div>
          ) : (
            <div className="product-cart">
              <ButtonGroup className="cart-btn-group">
                <Button
                  className="counter counter-btn"
                  onClick={decrementCounter}
                >
                  -
                </Button>
                <Box className="counter cart-counter">{cartCounter}</Box>
                <Button
                  className="counter counter-btn"
                  onClick={incrementCounter}
                >
                  +
                </Button>
              </ButtonGroup>
              <Button
                onClick={() => handleAddToCart(productData)}
                className="add-to-cart__btn"
              >
                ADD TO CART
              </Button>
            </div>
          )}
          <div className="product-socials">
            <Icon
              icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"}
              fontSize={23}
              color="#707070"
              onClick={() => {
                setIsFavorite(!isFavorite);
              }}
            />
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
            onClick={() => handleSectionChange("reviews")}
          >
            Reviews(0)
            {/* ${reviewCounter} */}
          </button>
        </div>
        <div className="info-field">
          {currentSection === "description" && (
            <p>This is the description section.</p>
          )}
          {currentSection === "aditional-info" && (
            <p>This is the Aditional-info section.</p>
          )}
          {currentSection === "reviews" && <p>This is the reviews section.</p>}
        </div>
      </div>
    </div>
  );
}
export default Products;
