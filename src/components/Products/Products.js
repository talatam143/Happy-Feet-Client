/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";

import { getProducts } from "../../api/Products";
import EachProduct from "./EachProduct";
import "./Products.css"

const intialFilterList = {
  category: "",
  brand: "",
  color: "",
  price: "",
  gender: "",
};

function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(intialFilterList);
  const [products, setProducts] = useState([]);

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
    setFilters(filterData);
    const { status, productData } = await getProducts(filterData);
    if (status === 200) {
      setProducts(productData);
    }
  };

  // const setParams = () => {
  //   navigate({
  //     pathname: "/products",
  //     search: createSearchParams({
  //       brand: "Roadster",
  //       category: "Sports Shoes#Casual Shoes",
  //     }).toString(),
  //   });
  // };

  return (
    <div>
      {products.length > 0 ? (
        <div className="productsContainer">
          {products.map((eachProduct) => (
            <EachProduct key={eachProduct._id} data={eachProduct} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Products;
