import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilters } from "../../stateslices/filtersSlice";

import WelcomeSkeleton from "../Addons/WelcomeSkeleton";
import logo from "../../images/clientLogo.svg";
import Category from "./Category";
import {
  getBrandsandCategories,
  getColorsAndBrands,
} from "../../api/welcomePage";
import "./welcomepage.css";
import Brand from "./Brand";
import man from "../../images/man.png";
import woman from "../../images/woman.png";
import Bag from "../../images/bag.png";
import Banners from "./Banners";

function Welcomepage() {
  const pageState = useSelector((state) => state.pageState);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const [remainingPageStatus, setRemainingPageStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCategoriesAndBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategoriesAndBrands = async () => {
    const { status, data } = await getBrandsandCategories();
    let categoriesNames = [];
    let brandNames = [];
    let colorsNames = [];
    if (status === 200) {
      setCategoriesList(data.categoriesList);
      const { remainingStatus, remainingData } = await getColorsAndBrands();
      if (remainingStatus === 200) {
        setBrandsList(remainingData.brandsList);
        setColorsList(remainingData.colorsList);
        setRemainingPageStatus(true);

        data.categoriesList.map((eachCategory) =>
          categoriesNames.push(eachCategory.name)
        );
        remainingData.brandsList.map((eachBrand) =>
          brandNames.push(eachBrand.name)
        );
        remainingData.colorsList.map((eachColor) =>
          colorsNames.push(eachColor)
        );
      }
      dispatch(setFilters({ categoriesNames, brandNames, colorsNames }));
    }
  };

  return (
    <div className="mainWelcomePageContainer">
      <div className="welcomeNavbarContainer">
        <img src={logo} alt="brand-logo" className="brandLogo" />
        <div className="navbarSearchContainer">
          <GoSearch className="navbarSearchIcon" />
          <input
            type="search"
            placeholder="Search"
            className="navbarSearchInput"
          />
        </div>
      </div>
      {pageState.loading && <WelcomeSkeleton />}
      {pageState.success && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Banners />
            <p className="welcomePageHeadings">Shop by Categories</p>
            <div className="welcomeCategoriesContainer">
              {categoriesList.map((eachCategory) => (
                <Category details={eachCategory} key={eachCategory.id} />
              ))}
            </div>
          </motion.div>
        </>
      )}
      {remainingPageStatus && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="welcomePageHeadings">Shop by Brands</p>
            <div className="welcomeBrandsContainer">
              {brandsList.map((eachBrand) => (
                <Brand details={eachBrand} key={eachBrand.id} />
              ))}
            </div>
          </motion.div>
          <p className="welcomePageHeadings">Shop by Gender</p>
          <div className="welcomePageGenderContainer">
            <Link
              className="globalLinks welcomePageGenderButton"
              to={`/products?gender=Male`}
            >
              <img
                src={man}
                alt="male-gender"
                className="welcomePageGenderImages"
              />
            </Link>
            <Link
              className="globalLinks welcomePageGenderButton"
              to={`/products?gender=Female`}
            >
              <img
                src={woman}
                alt="male-gender"
                className="welcomePageGenderImages"
              />
            </Link>
          </div>
          <p className="welcomePageHeadings">Shop by Colors</p>
          <div className="welcomePageColorsContainer">
            {colorsList.map((eachColor) => (
              <Link
                key={eachColor}
                className="globalLinks welcomePageColorLinks"
                to={`/products?color=${eachColor}`}
              >
                <Box
                  sx={{ boxShadow: 7, backgroundColor: eachColor }}
                  className="eachColorContainer"
                ></Box>
              </Link>
            ))}
          </div>
        </>
      )}
      {pageState.success && (
        <Box className="welcomePageAllProductsContainer" sx={{ boxShadow: 2 }}>
          <div className="welcomePageAllProductsSubContainer">
            <p className="welcomePageBagPara">
              Don't know what to choose. Click on Shop All to view all our
              collection.
            </p>
            <div className="welcomePageAllBagContainer">
              <img
                src={Bag}
                alt="shoppingBag"
                className="welcomePagebagImage"
              />
              <button
                className="welcomePagebagButton"
                onClick={() => navigate("/products")}
              >
                Shop All
              </button>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}

export default Welcomepage;
