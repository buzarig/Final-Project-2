import React from "react";
import PropTypes from "prop-types";
import "./imageZoom.scss";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function ImageZoom({ src }) {
  return (
    <Zoom>
      <img
        alt="That Wanaka Tree, New Zealand by Laura Smetsers"
        src={src}
        width="500"
        className="image-zoom"
      />
    </Zoom>
  );
}

ImageZoom.propTypes = {
  src: PropTypes.string.isRequired
};

export default ImageZoom;
