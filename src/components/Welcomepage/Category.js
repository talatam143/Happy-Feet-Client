import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Category(props) {
  const { details } = props;

  return (
    <Box className="eachCategoryContainer" sx={{ boxShadow: 1 }}>
      <Link className="globalLinks" to={`/products?category=${details.name}`}>
        <img
          src={`${process.env.REACT_APP_SERVER_URL}${details.image.filePath}`}
          alt="category-logo"
          className="eachCategoryImage"
        />
        <p className="eachCategoryPara">{details.name}</p>
      </Link>
    </Box>
  );
}

export default Category;
