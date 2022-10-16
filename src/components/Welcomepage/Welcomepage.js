import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import logo from "../../images/clientLogo.svg";
import Category from "./Category";
import { getBrandsandCategories } from "../../api/welcomePage";
import "./welcomepage.css";
import Brand from "./Brand";
import man from "../../images/man.png";
import woman from "../../images/woman.png";
import Bag from "../../images/bag.png"

function Welcomepage() {
  const pageState = useSelector((state) => state.pageState);
  const [categoriesList, setcategoriesList] = useState([]);
  const [brandsList, setbrandsList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoriesandBrands();
  }, []);

  const getCategoriesandBrands = async () => {
    const { status, data } = await getBrandsandCategories();
    if (status === 200) {
      setcategoriesList(data.categoriesList);
      setbrandsList(data.brandsList);
      setColorsList(data.colorsList);
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
      {pageState.success && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.1 }}
          >
            <p className="welcomePageHeadings">Categories</p>
            <div className="welcomeCategoriesContainer">
              {categoriesList.map((eachCategory) => (
                <Category details={eachCategory} key={eachCategory.id} />
              ))}
            </div>
            <p className="welcomePageHeadings">Brands</p>
            <div className="welcomeBrandsContainer">
              {brandsList.map((eachBrand) => (
                <Brand details={eachBrand} key={eachBrand.id} />
              ))}
            </div>
          </motion.div>
          <p className="welcomePageHeadings">Gender</p>
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
          <p className="welcomePageHeadings">Colors</p>
          <div className="welcomePageColorsContainer">
            {colorsList.map((eachColor) => (
              <Link
                key={eachColor}
                className="globalLinks"
                to={`/products?color=${eachColor}`}
              >
                <Box
                  sx={{ boxShadow: 7, backgroundColor: eachColor }}
                  className="eachColorContainer"
                ></Box>
                <p className="eachColorName" style={{ color: eachColor }}>
                  {eachColor}
                </p>
              </Link>
            ))}
          </div>
            <Box className="welcomePageAllProductsContainer" sx={{boxShadow:2}}>
              <div className="welcomePageAllProductsSubContainer">
                  <p className="welcomePageBagPara">Don't know what to choose...?</p>
                  <div className="welcomePageAllBagContainer">
                    <img src={Bag} alt="shoppingBag" className="welcomePagebagImage"/>
                    <button className="welcomePagebagButton" onClick={()=> navigate("/products")}>Shop All</button>
                  </div>
              </div>
            </Box>
        </>
      )}
    </div>
  );
}

export default Welcomepage;
