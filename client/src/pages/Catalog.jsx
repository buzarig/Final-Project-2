/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { getProductsArray, getAllProducts } from "../redux/actions/merchandise";

import api from "../http/api";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Search from "../components/filter/search";
import CheckboxesTags from "../components/filter/checkbox";
import BasicSelect from "../components/filter/basicSelect";
import FilterSlider from "../components/filter/filterSlider";
import CustomizedSwitches from "../components/filter/switch";
import ProductCard from "../components/productCard/ProductCard";

import "../styles/_catalog.scss";

const dataOptionsShop = ["diamond", "sapphire"];
const dataOptionsSort = [
  { value: "-", name: "Maximum price" },
  { value: "+", name: "Minimum price" }
];

function Catalog() {
  // const { products, isLoading } = useSelector((state) => state.merchandise);
  // const dispatch = useDispatch();

  //*test start
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [current, setCurrent] = useState(1);
  //*test end

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
    if (current > 0) {
      document.addEventListener("scroll", scrollHandler);
      return function () {
        document.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [current]);
  //*test filter start
  useEffect(() => {
    console.log("before", shopOptions);
    async function axiosMyAPI() {
      if (current > 0) {
        console.log("lol");
        try {
          setIsLoading(true);
          const stones = shopOptions ? shopOptions.split(",") : [];
          const data = await api
            .get(
              "/products/filter?minPrice=" +
                valueSliderMin +
                "&maxPrice=" +
                valueSliderMax +
                (stones.length ? "&stone=" + stones : "") +
                (checkedSale
                  ? "&previousPrice=4000,2499,5699,1499,7800,20999,17999"
                  : "") +
                (checkedStock
                  ? "&quantity=1,2,3,4,5,6,7,8,9,10,11,12,13,14"
                  : "") +
                `&perPage=9&startPage=${currentPage}` +
                (sortOptions && "&sort=" + sortOptions + "currentPrice")
            )
            .then((response) => response);
          setProducts(
            currentPage === 1
              ? data.data.data
              : [...products, ...data.data.data]
          );
          setCurrent(data.data.data.length);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
    axiosMyAPI();
    console.log(
      "after",
      shopOptions ? shopOptions.split(",") : [],
      currentPage,
      products.length
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
  //*test filter end

  //*test search start
  useEffect(() => {
    async function axiosMyAPIinput(valueSearch) {
      try {
        if (valueSearch != "") {
          setIsLoading(true);
          const data = await api
            .post(`/products/search`, { query: valueSearch })
            .then((products) => products);
          setProducts(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    axiosMyAPIinput(valueSearch);
  }, [valueSearch]);
  //*test search end

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
    setCurrent(1);
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
    setCurrent(1);
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
    setCurrent(1);
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
    setCurrent(1);
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
    setCurrent(1);
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
    setCurrent(1);
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
                dataOptions={dataOptionsShop}
                value={shopOptions ? shopOptions.split(",") : []}
              />
              <BasicSelect
                nameCheckboxes="Sort By"
                valueSelect={sortOptions}
                onValueSelect={changeSortOptions}
                listSelect={dataOptionsSort}
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
