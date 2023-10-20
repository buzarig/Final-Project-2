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

const dataOptionsShop = [
  { title: "With stone diamond", stone: "diamond" },
  { title: "With stone sapphire", stone: "sapphire" }
];
const dataOptionsSort = [
  { value: "-", name: "Maximum price" },
  { value: "+", name: "Minimum price" }
];

function Catalog() {
  const [checkedSale, setCheckedSale] = useState(false);
  // const [valueInput, setValueInput] = useState("");
  // const [valueSlider, setValueSlider] = useState([1500, 10000]);
  const [shopOptions, setShopOptions] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  // const { products, isLoading } = useSelector((state) => state.merchandise);
  // const dispatch = useDispatch();

  //*test start
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //*test end

  const [searchParams, setSearchParams] = useSearchParams({
    valueSearch: "",
    checkedStock: false,
    valueSliderMin: 1500,
    valueSliderMax: 10000
  });
  const valueSearch = searchParams.get("valueSearch");
  const checkedStock = searchParams.get("checkedStock") === "true";
  const valueSliderMin = Number(searchParams.get("valueSliderMin"));
  const valueSliderMax = Number(searchParams.get("valueSliderMax"));

  //*test filter start
  useEffect(() => {
    async function axiosMyAPI(valueSliderMin, valueSliderMax) {
      try {
        setIsLoading(true);
        const stones = shopOptions.map((item) => (item = item.stone));
        const data = await api
          .get(
            "/products/filter?minPrice=" +
              valueSliderMin +
              "&maxPrice=" +
              valueSliderMax +
              (stones.length ? "&stone=" + stones : "") + (checkedSale ? "&previousPrice=4000" : "") + (checkedStock ? "&quantity=5" : "") + 
              (sortOptions && "&sort=" + sortOptions + "currentPrice") 
          )
          .then((products) => products);
        setProducts(data.data.data);
        setIsLoading(false);
        console.log(
          shopOptions,
          "redux",
          data.data,
          "filters",
          data.data.data,
          "/products/filter?minPrice=" +
            valueSliderMin +
            "&maxPrice=" +
            valueSliderMax +
            "&stone=" +
            stones
        );
      } catch (error) {
        console.log(error);
      }
    }
    axiosMyAPI(valueSliderMin, valueSliderMax);
  }, [valueSliderMin, valueSliderMax, shopOptions, sortOptions, checkedSale, checkedStock]);
  //*test filter end

  //*test search start
  // useEffect(() => {
  //   async function axiosMyAPI(valueSearch) {
  //     try {
  //       if (valueSearch != "") {
  //         setIsLoading(true);
  //         const data = await api.post(`/products/search`, {query: valueSearch}).then((products) => products);
  //         setProducts(data.data);
  //         setIsLoading(false);
  //       }
  //       console.log('redux', data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   axiosMyAPI(valueSearch)
  // }, [valueSearch]);
  //*test search end

  // useEffect(() => {
  //   dispatch(getAllProducts(products, true));
  //   dispatch(getProductsArray());
  //   console.log("catalog", products, shopOptions);
  // }, [checkedStock]);

  function changeValueInput(e) {
    setSearchParams(
      (prev) => {
        prev.set("valueSearch", e);
        return prev;
      },
      { replace: true }
    );
  }

  function changeCheckedSale(e) {
    setCheckedSale(e);
  }

  function changeCheckedStock(e) {
    setSearchParams(
      (prev) => {
        prev.set("checkedStock", e);
        return prev;
      },
      { replace: true }
    );
  }

  function changeValueSlider(e) {
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
    setShopOptions(e);
  }

  function changeSortOptions(e) {
    setSortOptions(e.target.value);
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
            {products.length &&
              products.map((item) => (
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
