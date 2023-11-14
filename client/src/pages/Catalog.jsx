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
import useViewport from "../custom_hooks/viewport";
import useDebounce from "../custom_hooks/debounce";
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
  const [isFilterOpen, setFilterOpen] = useState(false);

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

  const debouncedSearchTerm = useDebounce(valueSearch, 1000);

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
    if (debouncedSearchTerm) {
      dispatch(getAllProducts(products, true, endedProducts));
      dispatch(getSearchProducts(valueSearch));
    } else {
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
    }
  }, [debouncedSearchTerm]);

  function scrollHandler(e) {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      1
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
        prev.set("valueSearch", "");
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
        prev.set("valueSearch", "");
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
        prev.set("valueSearch", "");
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
        prev.set("valueSearch", "");
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
        prev.set("valueSearch", "");
        prev.set("sortOptions", e.target.value);
        return prev;
      },
      { replace: true }
    );
  }

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  const { width } = useViewport();
  const breakpoint = 1399;

  return (
    <div className="catalog__wrapper">
      <div className="catalog">
        {width < breakpoint && (
          <div className="search__wrapper">
            <Search onValue={changeValueInput} valueInput={valueSearch} />
          </div>
        )}
        <h2 className="page__title">Shop The Latest</h2>
        <button onClick={toggleFilter} type="button" className="filter_btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="filter_btn__img"
          >
            <path
              d="M15.2133 3.95389H7.18145C6.96063 3.29805 6.3403 2.82422 5.61095 2.82422C4.8816 2.82422 4.26127 3.29805 4.04045 3.95389H2.78674C2.49551 3.95389 2.2594 4.19 2.2594 4.48124C2.2594 4.77247 2.49551 5.00858 2.78674 5.00858H4.04049C4.2613 5.66442 4.88163 6.13826 5.61099 6.13826C6.34034 6.13826 6.96067 5.66442 7.18149 5.00858H15.2133C15.5046 5.00858 15.7407 4.77247 15.7407 4.48124C15.7407 4.19 15.5046 3.95389 15.2133 3.95389ZM5.61095 5.08357C5.27883 5.08357 5.00862 4.81336 5.00862 4.48124C5.00862 4.14912 5.27883 3.87891 5.61095 3.87891C5.94307 3.87891 6.21328 4.14912 6.21328 4.48124C6.21328 4.81336 5.94307 5.08357 5.61095 5.08357Z"
              fill="#A18A68"
            />
            <path
              d="M15.2133 8.47245H13.9595C13.7387 7.81661 13.1184 7.34277 12.389 7.34277C11.6597 7.34277 11.0394 7.81661 10.8186 8.47245H2.78674C2.49551 8.47245 2.2594 8.70856 2.2594 8.99979C2.2594 9.29103 2.49551 9.52714 2.78674 9.52714H10.8186C11.0394 10.183 11.6598 10.6568 12.3891 10.6568C13.1184 10.6568 13.7388 10.183 13.9596 9.52714H15.2133C15.5046 9.52714 15.7407 9.29103 15.7407 8.99979C15.7407 8.70856 15.5046 8.47245 15.2133 8.47245ZM12.3891 9.60212C12.057 9.60212 11.7867 9.33191 11.7867 8.99979C11.7867 8.66767 12.057 8.39746 12.3891 8.39746C12.7212 8.39746 12.9914 8.66767 12.9914 8.99979C12.9914 9.33191 12.7212 9.60212 12.3891 9.60212Z"
              fill="#A18A68"
            />
            <path
              d="M15.2133 12.991H9.44084C9.22002 12.3352 8.59969 11.8613 7.87034 11.8613C7.14099 11.8613 6.52065 12.3352 6.29984 12.991H2.78674C2.49551 12.991 2.2594 13.2271 2.2594 13.5183C2.2594 13.8096 2.49551 14.0457 2.78674 14.0457H6.29984C6.52065 14.7015 7.14099 15.1754 7.87034 15.1754C8.59969 15.1754 9.22002 14.7015 9.44084 14.0457H15.2133C15.5046 14.0457 15.7407 13.8096 15.7407 13.5183C15.7407 13.2271 15.5046 12.991 15.2133 12.991ZM7.87034 14.1207C7.53822 14.1207 7.268 13.8505 7.268 13.5184C7.268 13.1863 7.53822 12.9161 7.87034 12.9161C8.20246 12.9161 8.47267 13.1862 8.47267 13.5183C8.47267 13.8505 8.20246 14.1207 7.87034 14.1207Z"
              fill="#A18A68"
            />
          </svg>
          <p className="filter_btn__text">Filters</p>
        </button>
        <div className="cards-list__wrapper">
          {(width > breakpoint || isFilterOpen) && (
            <div className="sidebar">
              {width > breakpoint && (
                <Search onValue={changeValueInput} valueInput={valueSearch} />
              )}
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
          )}
          <div className="cards-list">
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
                    previousPrice={item.previousPrice}
                    currentPrice={item.currentPrice}
                    imageUrl={item.imageUrls[0]}
                    itemNo={item.itemNo}
                    cardUrl={item.productUrl}
                    key={item.itemNo}
                    quantity={item.quantity}
                  />
                ))
              : "More products coming soon"}
          </div>
        </div>
        {endedProducts === 0 && (
          <p className="catalog__information-text">
            At the moment, this is all we have,
            <br />
            but we are working on expanding our assortment.
          </p>
        )}
      </div>
      {isLoading && (
        <CircularProgress
          style={{
            color: "#a18a68",
            position: "fixed",
            bottom: 10,
            right: 10
          }}
        />
      )}
    </div>
  );
}

export default Catalog;
