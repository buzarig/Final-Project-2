/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Search from "../components/filter/search";
import CheckboxesTags from "../components/filter/checkbox";
import FilterSlider from "../components/filter/filterSlider";
import CustomizedSwitches from "../components/filter/switch";
import "../styles/_catalog.scss";

function Catalog() {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");

  function changeChecked(e) {
    setChecked(e);
  }

  function changeValue(e) {
    setValue(e);
  }

  return (
    <div className="catalog__wrapper">
      <div className="catalog">
        <h2 className="page__title">Shop The Latest</h2>
        <div className="cards-list__wrapper">
          <div className="sidebar">
            <Search onValue={changeValue} />
            <Stack spacing={3} sx={{ width: 262 }}>
              <CheckboxesTags nameCheckboxes="Shop By" />
              <CheckboxesTags nameCheckboxes="Sort By" />
            </Stack>
            <FilterSlider filterName="Filter" />
            <FormGroup sx={{ height: 200 }}>
              <CustomizedSwitches
                nameSwitch="On sale"
                onChecked={changeChecked}
              />
              <CustomizedSwitches nameSwitch="In stock" />
            </FormGroup>
          </div>
          <div className="cards-list">{checked && <p>koka</p>}</div>
          {value && <p>{value}</p>}
        </div>
      </div>
    </div>
  );
}
export default Catalog;
