/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getFilteredProducts,
  getAllProducts,
  getSearchProducts
} from "../redux/actions/merchandise";
import Search from "../components/filter/search";
import CheckboxesTags from "../components/filter/checkbox";
import BasicSelect from "../components/filter/basicSelect";
import FilterSlider from "../components/filter/filterSlider";
import CustomizedSwitches from "../components/filter/switch";
import ProductCard from "../components/productCard/ProductCard";

import "../styles/_catalog.scss";

const optionsShop = ["diamond", "sapphire", "topaz", "emeralds"];
const optionsSort = [
  { value: "-", name: "Maximum price" },
  { value: "+", name: "Minimum price" }
];

function Catalog() {
  const { products, isLoading, endedProducts } = useSelector(
    (state) => state.merchandiseReducer
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams({
    valueSearch: "",
    checkedStock: false,
    checkedSale: false,
    valueSliderMin: 500,
    valueSliderMax: 25000,
    shopOptions: [],
    sortOptions: ""
  });
  const valueSearch = searchParams.get("valueSearch");
  const checkedStock = searchParams.get("checkedStock") === "true";
  const checkedSale = searchParams.get("checkedSale") === "true";
  const valueSliderMin = Number(searchParams.get("valueSliderMin"));
  const valueSliderMax = Number(searchParams.get("valueSliderMax"));
  const shopOptions = searchParams.get("shopOptions");
  const sortOptions = searchParams.get("sortOptions");

  useEffect(() => {
    if (endedProducts > 0) {
      document.addEventListener("scroll", scrollHandler);
      return function () {
        document.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [endedProducts]);

  useEffect(() => {
    dispatch(getAllProducts(products, true, endedProducts));
    dispatch(
      getFilteredProducts(
        products,
        valueSliderMin,
        valueSliderMax,
        shopOptions,
        sortOptions,
        checkedSale,
        checkedStock,
        currentPage
      )
    );
  }, [
    valueSliderMin,
    valueSliderMax,
    shopOptions,
    sortOptions,
    checkedSale,
    checkedStock,
    currentPage
  ]);

  useEffect(() => {
    dispatch(getAllProducts(products, true, endedProducts));
    dispatch(getSearchProducts(valueSearch));
  }, [valueSearch]);

  function scrollHandler(e) {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function changeValueInput(e) {
    setCurrentPage(1);
    setSearchParams(
      (prev) => {
        prev.set("valueSearch", e);
        prev.set("checkedStock", false);
        prev.set("checkedSale", false);
        prev.set("valueSliderMin", 500);
        prev.set("valueSliderMax", 25000);
        prev.set("shopOptions", []);
        prev.set("sortOptions", "");
        return prev;
      },
      { replace: true }
    );
  }

  function changeCheckedSale(e) {
    setCurrentPage(1);
    setSearchParams(
      (prev) => {
        prev.set("checkedSale", e);
        return prev;
      },
      { replace: true }
    );
  }

  function changeCheckedStock(e) {
    setCurrentPage(1);
    setSearchParams(
      (prev) => {
        prev.set("checkedStock", e);
        return prev;
      },
      { replace: true }
    );
  }

  function changeValueSlider(e) {
    setCurrentPage(1);
    setSearchParams(
      (prev) => {
        prev.set("valueSliderMin", e[0]);
        prev.set("valueSliderMax", e[1]);
        return prev;
      },
      { replace: true }
    );
  }

  function changeShopOptions(e) {
    setCurrentPage(1);
    setSearchParams(
      (prev) => {
        prev.set("shopOptions", e);
        return prev;
      },
      { replace: true }
    );
  }

  function changeSortOptions(e) {
    setCurrentPage(1);
    setSearchParams(
      (prev) => {
        prev.set("sortOptions", e.target.value);
        return prev;
      },
      { replace: true }
    );
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
                dataOptions={optionsShop}
                value={shopOptions ? shopOptions.split(",") : []}
              />
              <BasicSelect
                nameCheckboxes="Sort By"
                valueSelect={sortOptions}
                onValueSelect={changeSortOptions}
                listSelect={optionsSort}
              />
            </Stack>
            <FilterSlider
              filterName="Filter"
              value={[valueSliderMin, valueSliderMax]}
              changeValue={changeValueSlider}
            />
            <FormGroup sx={{ height: 200 }}>
              <CustomizedSwitches
                nameSwitch="On sale"
                onChecked={changeCheckedSale}
                checkedSwitch={checkedSale}
              />
              <CustomizedSwitches
                nameSwitch="In stock"
                onChecked={changeCheckedStock}
                checkedSwitch={checkedStock}
              />
            </FormGroup>
          </div>
          <div className="cards-list">
            {isLoading && <CircularProgress style={{ color: "#a18a68" }} />}
            {products.length
              ? products.map((item) => (
                  <ProductCard
                    discount={
                      item.previousPrice &&
                      Math.ceil(
                        ((item.previousPrice - item.currentPrice) /
                          item.previousPrice) *
                          100
                      )
                    }
                    title={item.name}
                    price={item.currentPrice}
                    imageUrl={item.imageUrls[0]}
                    itemNo={item.itemNo}
                    cardUrl={item.productUrl}
                    key={item.itemNo}
                  />
                ))
              : "More products coming soon"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
