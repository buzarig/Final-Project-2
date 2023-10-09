/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Search from "../components/filter/search";
import CheckboxesTags from "../components/filter/checkbox";
import FilterSlider from "../components/filter/filterSlider";
import CustomizedSwitches from "../components/filter/switch";
import "../styles/_catalog.scss";

function Catalog() {
  const [checkedSale, setCheckedSale] = useState(false);
  // const [valueInput, setValueInput] = useState("");
  const [valueSlider, setValueSlider] = useState([199.99, 479.99]);
  const [shopOptions, setShopOptions] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams({
    valueSearch: "",
    checkedStock: false
  });
  const valueSearch = searchParams.get("valueSearch");
  const checkedStock = searchParams.get("checkedStock") === "true";

  function changeValueInput(e) {
    setSearchParams(prev=>{
      prev.set("valueSearch", e)
      return prev
    }, {replace:true})
  }

  function changeCheckedSale(e) {
    setCheckedSale(e);
  }

  function changeCheckedStock(e) {
    setSearchParams(prev=>{
      prev.set("checkedStock", e)
      return prev
    }, {replace:true})
  }

  function changeValueSlider(e) {
    setValueSlider(e);
  }

  function changeShopOptions(e) {
    setShopOptions(e);
  }

  function changeSortOptions(e) {
    setSortOptions(e);
  }

  return (
    <div className="catalog__wrapper">
      <div className="catalog">
        <h2 className="page__title">Shop The Latest</h2>
        <div className="cards-list__wrapper">
          <div className="sidebar">
            <Search onValue={changeValueInput} valueInput={valueSearch} />
            <Stack spacing={3} sx={{ width: 262 }}>
              <CheckboxesTags
                nameCheckboxes="Shop By"
                onDataOptions={changeShopOptions}
              />
              <CheckboxesTags
                nameCheckboxes="Sort By"
                onDataOptions={changeSortOptions}
              />
            </Stack>
            <FilterSlider
              filterName="Filter"
              value={valueSlider}
              changeValue={changeValueSlider}
            />
            <FormGroup sx={{ height: 200 }}>
              <CustomizedSwitches
                nameSwitch="On sale"
                onChecked={changeCheckedSale}
              />
              <CustomizedSwitches
                nameSwitch="In stock"
                onChecked={changeCheckedStock}
                checkedSwitch={checkedStock}
              />
            </FormGroup>
          </div>
          <div className="cards-list">{checkedSale && <p>kokaSale</p>}</div>
          {valueSearch && <p>{valueSearch}</p>}
          {shopOptions && shopOptions.map((item) => <p>{item.title}</p>)}
        </div>
      </div>
    </div>
  );
}
export default Catalog;
