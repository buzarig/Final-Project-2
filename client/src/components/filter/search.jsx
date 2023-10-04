import React, { useState } from "react";
import img from "../../assets/images/filter/search.png";
import Box from "@mui/material/Box";

const formStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderBottom: "1px solid #03141215",
  marginBottom: "39px",
  "&:hover": {
    borderBottom: "1px solid #031412"
  }
};

const inputStyle = {
  width: "100%",
  fontFamily: "DM Sans",
  fontSize: "16px",
  fontWeight: "400",
  color: "#031412",
  marginBottom: "10px"
};

const Search = () => {
  const [setValue] = useState();

  return (
    <Box sx={formStyle}>
      <input
        style={inputStyle}
        type="text"
        placeholder="Search..."
        onChange={(event) => setValue(event.target.value)}
      />
      <img
        style={{ height: "17px", width: "17px", marginBottom: "10px" }}
        src={img}
        alt="search"
      />
    </Box>
  );
};

export default Search;
