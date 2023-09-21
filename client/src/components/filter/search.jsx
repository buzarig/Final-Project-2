import React, { useState } from "react";
import img from "../../assets/images/filter/search.png";
import "./_search.scss";

const Search = () => {
    
    const [setValue] = useState();

    return (
      <form className="search__form">
        <input
          className="search__input"
          type="text"
          placeholder="Search..."
          onChange={(event) => setValue(event.target.value)}
        />
        <img className="search__icon" src={img} alt="search" />
      </form>
    );
  };
  
  export default Search;