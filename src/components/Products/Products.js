/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { getProducts } from "../../api/Products";
import { ArrowLeft, FilterIcon, SortIcon } from "../SVG/svgrepo";
import EachProduct from "./EachProduct";
import "./Products.css";
import ProductSkeleton from "../Addons/ProductSkeleton";

const initialFilterList = {
  category: "",
  brand: "",
  color: "",
  price: "",
  gender: "",
};

const categories = ["Gender", "Category", "Brand", "Color"];

function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageState = useSelector((state) => state.pageState);
  const fetchFilters = useSelector((state) => state.filterState);
  const [filters, setFilters] = useState(initialFilterList);
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    let filterData = {
      category: "",
      brand: "",
      color: "",
      price: "",
      gender: "",
    };
    if (searchParams.get("category") !== null) {
      filterData.category = searchParams.get("category");
    }
    if (searchParams.get("brand") !== null) {
      filterData.brand = searchParams.get("brand");
    }
    if (searchParams.get("gender") !== null) {
      filterData.gender = searchParams.get("gender");
    }
    if (searchParams.get("color") !== null) {
      filterData.color = searchParams.get("color");
    }
    if (searchParams.get("price") !== null) {
      filterData.price = searchParams.get("price");
    }
    setFilters(filterData);
    const { status, productData } = await getProducts(filterData);
    if (status === 200) {
      setProducts(productData);
    }
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    let formattedBrands = filters.brand.replace(/&/g, "@");
    navigate({
      pathname: "",
      search: createSearchParams({
        color: filters.color,
        gender: filters.gender,
        category: filters.category,
        brand: formattedBrands,
        price: e.target.value,
      }).toString(),
    });
    setShowSort(false);
  };

  const handleFilterChange = (e) => {
    let isFilterPresent;
    if (e.target.name === "color") {
      isFilterPresent = getPreviousColor(e.target.value);
    } else if (e.target.name === "brand") {
      isFilterPresent = getPreviousBrands(e.target.value);
    } else if (e.target.name === "category") {
      isFilterPresent = getPreviousCategories(e.target.value);
    }
    if (e.target.name !== "gender") {
      if (isFilterPresent) {
        let getFilters = filters[e.target.name].split("%23");
        let newFiltersList = [];
        // eslint-disable-next-line array-callback-return
        getFilters.map((eachGetFilter) => {
          if (eachGetFilter.replace(/%20/g, " ") !== e.target.value) {
            newFiltersList.push(eachGetFilter);
          }
        });
        setFilters({ ...filters, [e.target.name]: newFiltersList.join("%23") });
      } else {
        let previousFilter = filters[e.target.name];
        if (previousFilter.length > 1) {
          let newFilter =
            previousFilter + "%23" + e.target.value.replace(/ /g, "%20");
          setFilters({ ...filters, [e.target.name]: newFilter });
        } else {
          setFilters({
            ...filters,
            [e.target.name]: e.target.value.replace(/ /g, "%20"),
          });
        }
      }
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }
  };

  const applyFilters = () => {
    let formattedBrands = filters.brand.replace(/&/g, "@");
    navigate({
      pathname: "",
      search: createSearchParams({
        color: filters.color,
        gender: filters.gender,
        category: filters.category,
        brand: formattedBrands,
        price: filters.price,
      }).toString(),
    });
    setShowFilter(false);
  };

  const resetFilters = () => {
    setFilters(initialFilterList);
    setSelectedCategory(categories[0]);
    setShowFilter(false);
    navigate({
      pathname: "",
    });
  };

  const getPreviousCategories = (eachCategory) => {
    let categories = filters.category.split("%23");
    let isPresent = categories.filter(
      (eachFilter) => eachCategory === eachFilter.replace(/%20/g, " ")
    );
    if (isPresent.length === 1) {
      return true;
    }
  };

  const getPreviousBrands = (eachBrand) => {
    let brands = filters.brand.split("%23");
    let formattedBrands = [];
    for (let eachBrand of brands) {
      let b = "";
      b = eachBrand.replace(/%20/g, " ");
      formattedBrands.push(b.replace(/@/g, "&"));
    }
    let isPresent = formattedBrands.filter(
      (eachFilter) => eachBrand === eachFilter.replace(/%20/g, " ")
    );
    if (isPresent.length === 1) {
      return true;
    }
  };

  const getPreviousColor = (eachColor) => {
    let colors = filters.color.split("%23");
    let isPresent = colors.filter(
      (eachFilter) => eachColor === eachFilter.replace(/%20/g, " ")
    );
    if (isPresent.length === 1) {
      return true;
    }
  };

  const resetGender = () => {
    setFilters({ ...filters, gender: "" });
  };

  const resetSort = () => {
    setFilters({ ...filters, price: "" });
    let formattedBrands = filters.brand.replace(/&/g, "@");
    navigate({
      pathname: "",
      search: createSearchParams({
        color: filters.color,
        gender: filters.gender,
        category: filters.category,
        brand: formattedBrands,
        price: "",
      }).toString(),
    });
    setShowSort(false);
  };

  return (
    <div>
      <div className="accountMyAddressHeaderContainer">
        <button
          onClick={() => navigate(-1)}
          className="myAddressHeaderArrowButton"
        >
          <ArrowLeft />
        </button>
        <div>
          <p
            style={{
              margin: "0 0 0 10px",
              fontSize: "18px",
              color: "#33272a",
              fontWeight:600
            }}
          >
            Products
          </p>
          {pageState.success && (
            <p
              style={{
                margin: "0 0 0 10px",
                fontSize: "14px",
                color: "#594a4e",
              }}
            >
              {products.length} products
            </p>
          )}
        </div>
      </div>
      {pageState.loading ? (
        <ProductSkeleton />
      ) : (
        <>
          {products.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="productsContainer"
                onClick={() => setShowSort(false)}
              >
                {products.map((eachProduct) => (
                  <EachProduct key={eachProduct._id} data={eachProduct} />
                ))}
              </div>
            </motion.div>
          ) : (
            <></>
          )}
          <button
            className="productsFilterButton"
            onClick={() => {
              setShowFilter(true);
              setSelectedCategory(categories[0]);
            }}
          >
            <FilterIcon color="#33272a" />
          </button>
          <button
            className="productsSortButton"
            onClick={() => setShowSort(true)}
          >
            <SortIcon color="#33272a" />
          </button>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, y: 1000 }}
              animate={{ opacity: 1, position: "fixed", top: 0, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="productsFilterContainer">
                <div className="productsFilterHeader">
                  <button
                    onClick={() => setShowFilter(false)}
                    className="productsFilterBackButton"
                  >
                    <ArrowLeft />
                  </button>
                  <p className="productsFilterHeaderPara">Filters</p>
                </div>
                <div className="productsFiltersBodyContainer">
                  <div className="productsFiltersHeadingsContainer">
                    {categories.map((eachCategory) => (
                      <p
                        className={
                          selectedCategory === eachCategory
                            ? "selectedProductsFiltersHeading"
                            : "productsFiltersHeading"
                        }
                        key={eachCategory}
                        onClick={() => {
                          setSelectedCategory(eachCategory);
                        }}
                      >
                        {eachCategory}
                      </p>
                    ))}
                  </div>
                  <div className="productsFiltersCheckBoxesContainer">
                    {selectedCategory === "Gender" && (
                      <div className="genderradioButton">
                        <div className="productFiltersEachRadioDiv">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            id="maleId"
                            onChange={handleFilterChange}
                            checked={"Male" === filters.gender}
                          />
                          <label htmlFor="maleId">Male</label>
                        </div>
                        <div className="productFiltersEachRadioDiv">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            id="femaleId"
                            onChange={handleFilterChange}
                            checked={"Female" === filters.gender}
                          />
                          <label htmlFor="femaleId">Female</label>
                        </div>
                        <button
                          className="productsFilterGenderResetButton"
                          id="gender"
                          onClick={resetGender}
                        >
                          Reset
                        </button>
                      </div>
                    )}
                    {selectedCategory === "Category" &&
                      fetchFilters.categories.map((eachCategory) => (
                        <div
                          key={eachCategory}
                          className="productFiltersEachRadioDiv"
                        >
                          <input
                            type="checkbox"
                            value={eachCategory}
                            name="category"
                            onChange={handleFilterChange}
                            id={eachCategory}
                            checked={getPreviousCategories(eachCategory)}
                            className="productsFilterColorsCheckBox"
                          />
                          <label htmlFor={eachCategory}>{eachCategory}</label>
                        </div>
                      ))}
                    {selectedCategory === "Brand" &&
                      fetchFilters.brands.map((eachBrand) => (
                        <div
                          key={eachBrand}
                          className="productFiltersEachRadioDiv"
                        >
                          <input
                            type="checkbox"
                            value={eachBrand}
                            name="brand"
                            onChange={handleFilterChange}
                            id={eachBrand}
                            checked={getPreviousBrands(eachBrand)}
                            className="productsFilterColorsCheckBox"
                          />
                          <label htmlFor={eachBrand}>{eachBrand}</label>
                        </div>
                      ))}
                    {selectedCategory === "Color" &&
                      fetchFilters.colors.map((eachColor) => (
                        <div
                          key={eachColor}
                          className="productFiltersEachRadioDiv"
                        >
                          <input
                            type="checkbox"
                            value={eachColor}
                            name="color"
                            onChange={handleFilterChange}
                            id={eachColor}
                            className="productsFilterColorsCheckBox"
                            checked={getPreviousColor(eachColor)}
                          />
                          <p
                            htmlFor={eachColor}
                            style={{ backgroundColor: eachColor }}
                            className="productColorFilterLabel"
                          ></p>
                          <label htmlFor={eachColor}>{eachColor}</label>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="productsFilterFooterContainer">
                  <button
                    className="productsFilterResetButton"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                  <button
                    onClick={applyFilters}
                    className="productsFilterApplyButton"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {showSort && (
            <motion.div
              initial={{ opacity: 0, y: 1000 }}
              animate={{ opacity: 1, position: "fixed", top: 0, y: "75%" }}
              transition={{ duration: 0.6 }}
            >
              <div className="productsFilterContainer">
                <p className="filtersProductSortHeading">Sort By</p>
                <div className="genderradioButton">
                  <div className="productFiltersEachRadioDiv">
                    <input
                      type="radio"
                      name="price"
                      value="HIGH"
                      id="highId"
                      onChange={handleSortChange}
                      checked={"HIGH" === filters.price}
                    />
                    <label htmlFor="highId">Price (highest first)</label>
                  </div>
                  <div className="productFiltersEachRadioDiv">
                    <input
                      type="radio"
                      name="price"
                      value="LOW"
                      id="lowId"
                      onChange={handleSortChange}
                      checked={"LOW" === filters.price}
                    />
                    <label htmlFor="lowId">Price (lowest first)</label>
                  </div>
                  <div className="sortResetButtonContainer">
                    <button className="sortResetButton" onClick={resetSort}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
