/* eslint-disable no-unused-expressions */
// eslint-disable react/destructuring-assignment

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const PriceSlider = styled(Slider)(({ theme }) => ({
  color: "#000",
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

function FilterSlider() {
  const [value, setValue] = useState([199.99, 479.99]);

  const handleChange = (event, newValue) => {
    let minValue = value[0] !== newValue[0] ? newValue[0] - 0.01 : newValue[0];
    let maxValue = value[1] !== newValue[1] ? newValue[1] - 0.01 : newValue[1];
    maxValue === 479.98 && (maxValue += 0.01);
    minValue < 49.99 && (minValue = 49.99);
    setValue([minValue, maxValue]);
  };

  return (
    <div className="filter__wrapper">
      <Box sx={{ width: 262, marginTop: 5 }}>
        <PriceSlider
          getAriaLabel={() => "Temperature range"}
          value={value}
          min={49.99}
          max={479.99}
          step={10}
          onChangeCommitted={handleChange}
          valueLabelDisplay="auto"
        />
        <Typography
          id="non-linear-slider"
          style={{ color: "#707070" }}
          gutterBottom
        >
          Price: ${value[0]} - $ {value[1]}
        </Typography>
      </Box>
    </div>
  );
}

export default FilterSlider;
