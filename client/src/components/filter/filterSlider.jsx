/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
// eslint-disable react/destructuring-assignment

import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const PriceSlider = styled(Slider)(({ theme }) => ({
  color: "#000",
  width: 262,
  marginTop: 25,
  "& .MuiSlider-thumb": {
    height: 12,
    width: 4,
    backgroundColor: "#000",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)"
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1
    }
  },
  "& .MuiSlider-track": {
    height: 2
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#000" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 2
  }
}));

function FilterSlider({ value, changeValue }) {
  const handleChange = (event, newValue) => {
    let minValue = newValue[0];
    let maxValue = newValue[1];
    minValue > maxValue && (minValue = maxValue - 10);
    maxValue < minValue && (maxValue = minValue + 10);
    changeValue([minValue, maxValue]);
  };

  return (
    <>
      <PriceSlider
        value={value}
        max={25000}
        min={500}
        step={10}
        onChangeCommitted={handleChange}
        valueLabelDisplay="auto"
      />
      <Typography
        id="non-linear-slider"
        style={{ color: "#707070" }}
        gutterBottom
      >
        Price: ${value[1]} - $ {value[0]}
      </Typography>
    </>
  );
}

export default FilterSlider;
