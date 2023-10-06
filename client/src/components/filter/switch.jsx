import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 37,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 4,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 14,
    height: 14
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#707070" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}));

const formControlLabelStyle = {
  "& .MuiFormControlLabel-label": {
    fontSize: 16,
    fontFamily: "DM Sans, sans-serif"
  }
};

export default function CustomizedSwitches({ nameSwitch, onChecked }) {
  function changeChecked(event) {
    onChecked(event.target.checked);
  }

  return (
    <FormControlLabel
      control={<IOSSwitch onChange={changeChecked} />}
      label={nameSwitch}
      labelPlacement="start"
      sx={{
        m: 0,
        mt: 5,
        justifyContent: "space-between",
        ...formControlLabelStyle
      }}
    />
  );
}
